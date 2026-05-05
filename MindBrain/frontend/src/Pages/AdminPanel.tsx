import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Download,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Search,
  Shield,
  Trash2,
  UserCog,
  Users,
} from 'lucide-react';
import {
  apiDelete,
  apiGet,
  apiGetBlob,
  apiPost,
  apiPut,
  resolveApiAssetUrl,
  type AdminUserRecord,
  type ApiProject,
  type ApiResponse,
  type CareerApplicationRecord,
  type ContactRecord,
  type Pagination,
} from '../api/api';
import { useAuth } from '../context/AuthContext';

type AdminSection = 'overview' | 'projects' | 'users' | 'contacts' | 'careers';

interface ProjectListData {
  projects: ApiProject[];
  pagination: Pagination;
}

interface UserListData {
  users: AdminUserRecord[];
  pagination: Pagination;
}

interface ContactListData {
  contacts: ContactRecord[];
  pagination: Pagination;
}

interface CareerListData {
  applications: CareerApplicationRecord[];
  pagination: Pagination;
}

interface ProjectFormState {
  title: string;
  description: string;
  image: string;
  technologies: string;
  client: string;
  category: string;
  domain: string;
  liveUrl: string;
  githubUrl: string;
}

interface UserFormState {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const emptyProjectForm: ProjectFormState = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  client: '',
  category: '',
  domain: '',
  liveUrl: '',
  githubUrl: '',
};

const emptyUserForm: UserFormState = {
  name: '',
  email: '',
  password: '',
  role: 'user',
};

const sectionMeta: Array<{
  id: AdminSection;
  label: string;
  icon: React.ElementType;
  accent: string;
}> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, accent: 'from-cyan-400 to-blue-500' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, accent: 'from-amber-400 to-orange-500' },
  { id: 'users', label: 'Users', icon: Users, accent: 'from-emerald-400 to-teal-500' },
  { id: 'contacts', label: 'Contacts', icon: Mail, accent: 'from-fuchsia-400 to-pink-500' },
  { id: 'careers', label: 'Careers', icon: Briefcase, accent: 'from-violet-400 to-indigo-500' },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const parseTechnologies = (value: string) =>
  value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth();

  const [section, setSection] = useState<AdminSection>('overview');
  const [flash, setFlash] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [projectSearch, setProjectSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [careerSearch, setCareerSearch] = useState('');

  const [projectPage, setProjectPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [careerPage, setCareerPage] = useState(1);

  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [careers, setCareers] = useState<CareerApplicationRecord[]>([]);

  const [projectPagination, setProjectPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1, limit: 10 });
  const [userPagination, setUserPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1, limit: 10 });
  const [contactPagination, setContactPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1, limit: 20 });
  const [careerPagination, setCareerPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1, limit: 20 });

  const [overviewTotals, setOverviewTotals] = useState({
    projects: 0,
    users: 0,
    contacts: 0,
    careers: 0,
  });

  const [loadingSection, setLoadingSection] = useState<Record<AdminSection, boolean>>({
    overview: false,
    projects: false,
    users: false,
    contacts: false,
    careers: false,
  });
  const [submittingProject, setSubmittingProject] = useState(false);
  const [submittingUser, setSubmittingUser] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const [editingProject, setEditingProject] = useState<ApiProject | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
  const [userForm, setUserForm] = useState<UserFormState>(emptyUserForm);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');

  const setSectionLoading = (target: AdminSection, value: boolean) => {
    setLoadingSection((current) => ({ ...current, [target]: value }));
  };

  const showError = (error: unknown) => {
    setFlash({
      type: 'error',
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  };

  const showSuccess = (message: string) => {
    setFlash({ type: 'success', message });
  };

  const loadOverview = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      return;
    }

    setSectionLoading('overview', true);
    try {
      const [projectRes, userRes, contactRes, careerRes] = await Promise.all([
        apiGet<ApiResponse<ProjectListData>>('/projects?page=1&limit=1'),
        apiGet<ApiResponse<UserListData>>('/admin/users?page=1&limit=1'),
        apiGet<ApiResponse<ContactListData>>('/admin/contacts?page=1&limit=1'),
        apiGet<ApiResponse<CareerListData>>('/admin/careers?page=1&limit=1'),
      ]);

      setOverviewTotals({
        projects: projectRes.data.pagination.total,
        users: userRes.data.pagination.total,
        contacts: contactRes.data.pagination.total,
        careers: careerRes.data.pagination.total,
      });
    } catch (error) {
      showError(error);
    } finally {
      setSectionLoading('overview', false);
    }
  }, [user]);

  const loadProjects = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      return;
    }

    setSectionLoading('projects', true);
    try {
      const params = new URLSearchParams({
        page: String(projectPage),
        limit: '10',
      });
      if (projectSearch.trim()) params.set('search', projectSearch.trim());

      const res = await apiGet<ApiResponse<ProjectListData>>(`/projects?${params.toString()}`);
      setProjects(res.data.projects);
      setProjectPagination(res.data.pagination);
    } catch (error) {
      showError(error);
    } finally {
      setSectionLoading('projects', false);
    }
  }, [projectPage, projectSearch, user]);

  const loadUsers = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      return;
    }

    setSectionLoading('users', true);
    try {
      const params = new URLSearchParams({
        page: String(userPage),
        limit: '10',
      });
      if (userSearch.trim()) params.set('search', userSearch.trim());

      const res = await apiGet<ApiResponse<UserListData>>(`/admin/users?${params.toString()}`);
      setUsers(res.data.users);
      setUserPagination(res.data.pagination);
    } catch (error) {
      showError(error);
    } finally {
      setSectionLoading('users', false);
    }
  }, [user, userPage, userSearch]);

  const loadContacts = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      return;
    }

    setSectionLoading('contacts', true);
    try {
      const res = await apiGet<ApiResponse<ContactListData>>(`/admin/contacts?page=${contactPage}&limit=20`);
      setContacts(res.data.contacts);
      setContactPagination(res.data.pagination);
    } catch (error) {
      showError(error);
    } finally {
      setSectionLoading('contacts', false);
    }
  }, [contactPage, user]);

  const loadCareers = useCallback(async () => {
    if (!user || user.role !== 'admin') {
      return;
    }

    setSectionLoading('careers', true);
    try {
      const params = new URLSearchParams({
        page: String(careerPage),
        limit: '20',
      });
      if (careerSearch.trim()) params.set('search', careerSearch.trim());

      const res = await apiGet<ApiResponse<CareerListData>>(`/admin/careers?${params.toString()}`);
      setCareers(res.data.applications);
      setCareerPagination(res.data.pagination);
    } catch (error) {
      showError(error);
    } finally {
      setSectionLoading('careers', false);
    }
  }, [careerPage, careerSearch, user]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    if (section === 'projects') loadProjects();
  }, [section, loadProjects]);

  useEffect(() => {
    if (section === 'users') loadUsers();
  }, [section, loadUsers]);

  useEffect(() => {
    if (section === 'contacts') loadContacts();
  }, [section, loadContacts]);

  useEffect(() => {
    if (section === 'careers') loadCareers();
  }, [section, loadCareers]);

  useEffect(() => {
    if (!flash) return;

    const timer = window.setTimeout(() => setFlash(null), 3200);
    return () => window.clearTimeout(timer);
  }, [flash]);

  useEffect(() => {
    if (projectImageFile) {
      const objectUrl = window.URL.createObjectURL(projectImageFile);
      setProjectImagePreview(objectUrl);

      return () => {
        window.URL.revokeObjectURL(objectUrl);
      };
    }

    setProjectImagePreview(projectForm.image ? resolveApiAssetUrl(projectForm.image) : '');
    return undefined;
  }, [projectForm.image, projectImageFile]);

  const overviewCards = useMemo(
    () => [
      { key: 'projects', label: 'Projects', value: overviewTotals.projects, icon: FolderKanban, section: 'projects' as const },
      { key: 'users', label: 'Users', value: overviewTotals.users, icon: Users, section: 'users' as const },
      { key: 'contacts', label: 'Contacts', value: overviewTotals.contacts, icon: Mail, section: 'contacts' as const },
      { key: 'careers', label: 'Career Applications', value: overviewTotals.careers, icon: Briefcase, section: 'careers' as const },
    ],
    [overviewTotals]
  );

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm(emptyProjectForm);
    setProjectImageFile(null);
  };

  const resetUserForm = () => {
    setEditingUser(null);
    setUserForm(emptyUserForm);
  };

  const handleProjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittingProject(true);

    try {
      const payload = new FormData();
      payload.append('title', projectForm.title);
      payload.append('description', projectForm.description);
      payload.append('technologies', JSON.stringify(parseTechnologies(projectForm.technologies)));
      payload.append('client', projectForm.client);
      payload.append('category', projectForm.category);
      payload.append('domain', projectForm.domain);
      payload.append('liveUrl', projectForm.liveUrl);
      payload.append('githubUrl', projectForm.githubUrl);
      payload.append('image', projectForm.image);

      if (projectImageFile) {
        payload.set('image', projectImageFile);
      }

      if (editingProject) {
        await apiPut<ApiResponse<ApiProject>>(`/admin/projects/${editingProject._id}`, payload);
        showSuccess('Project updated successfully');
      } else {
        await apiPost<ApiResponse<ApiProject>>('/admin/projects', payload);
        showSuccess('Project created successfully');
      }

      resetProjectForm();
      await Promise.all([loadProjects(), loadOverview()]);
    } catch (error) {
      showError(error);
    } finally {
      setSubmittingProject(false);
    }
  };

  const handleUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittingUser(true);

    try {
      const trimmedName = userForm.name.trim();
      const trimmedEmail = userForm.email.trim().toLowerCase();
      const trimmedPassword = userForm.password.trim();

      const payload: Partial<UserFormState> = {
        name: trimmedName,
        email: trimmedEmail,
        role: userForm.role,
      };

      if (trimmedPassword) {
        payload.password = trimmedPassword;
      }

      if (editingUser) {
        await apiPut<ApiResponse<AdminUserRecord>>(`/admin/users/${editingUser._id}`, payload);
        showSuccess('User updated successfully');
      } else {
        await apiPost<ApiResponse<AdminUserRecord>>('/admin/users', {
          ...payload,
          password: trimmedPassword,
        });
        showSuccess('User created successfully');
      }

      resetUserForm();
      await Promise.all([loadUsers(), loadOverview()]);
    } catch (error) {
      showError(error);
    } finally {
      setSubmittingUser(false);
    }
  };

  const startProjectEdit = (project: ApiProject) => {
    setEditingProject(project);
    setProjectImageFile(null);
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      client: project.client,
      category: project.category,
      domain: project.domain,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    });
  };

  const userFormRef = React.useRef<HTMLDivElement>(null);

  const startUserEdit = (target: AdminUserRecord) => {
    setEditingUser(target);
    setUserForm({
      name: target.name,
      email: target.email,
      password: '',
      role: target.role,
    });
    setTimeout(() => {
      userFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const removeProject = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;

    try {
      setDeletingProjectId(id);
      await apiDelete<ApiResponse<{ id: string }>>(`/admin/projects/${id}`);
      showSuccess('Project deleted successfully');
      await Promise.all([loadProjects(), loadOverview()]);
      if (editingProject?._id === id) resetProjectForm();
    } catch (error) {
      showError(error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  const removeUser = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;

    try {
      setDeletingUserId(id);
      await apiDelete<ApiResponse<{ id: string }>>(`/admin/users/${id}`);
      showSuccess('User deleted successfully');
      await Promise.all([loadUsers(), loadOverview()]);
      if (editingUser?._id === id) resetUserForm();
    } catch (error) {
      showError(error);
    } finally {
      setDeletingUserId(null);
    }
  };

  const markContactAsRead = async (id: string) => {
    try {
      await apiPut<ApiResponse<ContactRecord>>(`/admin/contacts/${id}/read`, {});
      showSuccess('Message marked as read');
      await Promise.all([loadContacts(), loadOverview()]);
    } catch (error) {
      showError(error);
    }
  };

  const removeContact = async (id: string) => {
    if (!window.confirm('Delete this contact message?')) return;

    try {
      await apiDelete<ApiResponse<{ id: string }>>(`/admin/contacts/${id}`);
      showSuccess('Contact deleted successfully');
      await Promise.all([loadContacts(), loadOverview()]);
    } catch (error) {
      showError(error);
    }
  };

  const downloadResume = async (id: string) => {
    try {
      const { blob, fileName } = await apiGetBlob(`/admin/careers/${id}/resume`);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName ?? 'resume';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showError(error);
    }
  };

  const removeCareer = async (id: string) => {
    if (!window.confirm('Delete this career application?')) return;

    try {
      await apiDelete<ApiResponse<{ id: string }>>(`/admin/careers/${id}`);
      showSuccess('Career application deleted successfully');
      await Promise.all([loadCareers(), loadOverview()]);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(135deg,_#020617,_#0f172a_42%,_#111827)] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300">MindBrain Admin</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Control room for your backend
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Manage projects, users, contacts, and career applications from one panel connected
                directly to your existing API.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Signed in</p>
                <p className="mt-1 text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-300">{user?.email}</p>
              </div>
              <Link
                to="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View website
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {flash && (
          <div
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
              flash.type === 'success'
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                : 'border-red-400/30 bg-red-400/10 text-red-100'
            }`}
          >
            {flash.message}
          </div>
        )}

        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl">
            <nav className="space-y-2">
              {sectionMeta.map((item) => {
                const Icon = item.icon;
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      active
                        ? `bg-gradient-to-r ${item.accent} text-slate-950 shadow-lg`
                        : 'bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Admin role active</p>
                  <p className="text-xs text-slate-400">JWT-protected backend access</p>
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            {section === 'overview' && (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {overviewCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.key}
                        type="button"
                        onClick={() => setSection(card.section)}
                        className="rounded-[1.75rem] border border-white/10 bg-white/7 p-5 text-left shadow-xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <div className="rounded-2xl bg-white/10 p-3 text-cyan-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Total</span>
                        </div>
                        <p className="mt-6 text-sm text-slate-400">{card.label}</p>
                        <p className="mt-2 text-4xl font-semibold text-white">{card.value}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                    <h2 className="text-xl font-semibold text-white">Backend coverage</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      This panel now matches your current backend admin capabilities, including the
                      added career application management endpoints.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">CRUD</p>
                        <p className="mt-2 font-medium text-white">Projects and users</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Inbox</p>
                        <p className="mt-2 font-medium text-white">Contacts with read actions</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Hiring</p>
                        <p className="mt-2 font-medium text-white">Career applications and resumes</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Auth</p>
                        <p className="mt-2 font-medium text-white">Admin-only route protection</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">Live status</h2>
                      <button
                        type="button"
                        onClick={loadOverview}
                        className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
                      >
                        Refresh
                      </button>
                    </div>
                    <div className="mt-5 space-y-3">
                      {overviewCards.map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
                        >
                          <span className="text-sm text-slate-300">{item.label}</span>
                          <span className="text-sm font-semibold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-500">
                      {loadingSection.overview ? 'Syncing data...' : 'Connected to backend'}
                    </p>
                  </div>
                </div>
              </>
            )}

            {section === 'projects' && (
              <div className="grid gap-6 2xl:grid-cols-[420px_minmax(0,1fr)]">
                <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      {editingProject ? 'Edit project' : 'Create project'}
                    </h2>
                    <div className="flex items-center gap-3">
                      {editingProject && (
                        <button
                          type="button"
                          onClick={() => removeProject(editingProject._id)}
                          disabled={deletingProjectId === editingProject._id}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-400/25 bg-red-400/10 text-red-100 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label="Delete project"
                          title="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      {editingProject && (
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleProjectSubmit} className="mt-5 space-y-4">
                    <AdminInput label="Title" value={projectForm.title} onChange={(value) => setProjectForm((current) => ({ ...current, title: value }))} required />
                    <AdminTextarea label="Description" value={projectForm.description} onChange={(value) => setProjectForm((current) => ({ ...current, description: value }))} required rows={5} />
                    <AdminFileInput
                      label="Project Image"
                      hint="Upload JPG, PNG, WEBP, or GIF up to 5 MB"
                      fileName={projectImageFile?.name || ''}
                      existingValue={projectForm.image}
                      previewSrc={projectImagePreview}
                      onChange={(file) => setProjectImageFile(file)}
                      onClear={() => {
                        setProjectImageFile(null);
                        setProjectForm((current) => ({ ...current, image: '' }));
                      }}
                    />
                    <AdminTextarea label="Technologies" hint="Comma or line separated" value={projectForm.technologies} onChange={(value) => setProjectForm((current) => ({ ...current, technologies: value }))} rows={3} />
                    <AdminInput label="Client" value={projectForm.client} onChange={(value) => setProjectForm((current) => ({ ...current, client: value }))} />
                    <AdminInput label="Category" value={projectForm.category} onChange={(value) => setProjectForm((current) => ({ ...current, category: value }))} />
                    <AdminInput label="Domain" value={projectForm.domain} onChange={(value) => setProjectForm((current) => ({ ...current, domain: value }))} />
                    <AdminInput label="Live URL" value={projectForm.liveUrl} onChange={(value) => setProjectForm((current) => ({ ...current, liveUrl: value }))} />
                    <AdminInput label="GitHub URL" value={projectForm.githubUrl} onChange={(value) => setProjectForm((current) => ({ ...current, githubUrl: value }))} />

                    <button
                      type="submit"
                      disabled={submittingProject}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {editingProject ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {submittingProject ? 'Saving...' : editingProject ? 'Update project' : 'Create project'}
                    </button>
                  </form>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                  <SectionToolbar
                    title="Projects"
                    search={projectSearch}
                    onSearchChange={(value) => {
                      setProjectPage(1);
                      setProjectSearch(value);
                    }}
                    onRefresh={loadProjects}
                  />

                  <div className="mt-5 space-y-4">
                    {loadingSection.projects ? (
                      <EmptyState message="Loading projects..." />
                    ) : projects.length === 0 ? (
                      <EmptyState message="No projects found for the current search." />
                    ) : (
                      projects.map((project) => (
                        <div key={project._id} className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="min-w-0 text-lg font-semibold text-white sm:text-xl">
                              <span className="block truncate">{project.title}</span>
                            </h3>

                            <div className="flex shrink-0 flex-wrap gap-2">
                              <button type="button" onClick={() => startProjectEdit(project)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                                <Pencil className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => removeProject(project._id)}
                                disabled={deletingProjectId === project._id}
                                className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <Trash2 className="h-4 w-4" />
                                {deletingProjectId === project._id ? 'Deleting...' : 'Delete'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <PaginationControls pagination={projectPagination} onChange={setProjectPage} />
                </div>
              </div>
            )}

            {section === 'users' && (
              <div className="grid gap-6 2xl:grid-cols-[400px_minmax(0,1fr)]">
                <div ref={userFormRef} className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      {editingUser ? 'Edit user' : 'Create user'}
                    </h2>
                    {editingUser && (
                      <button
                        type="button"
                        onClick={resetUserForm}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleUserSubmit} className="mt-5 space-y-4">
                    <AdminInput label="Name" value={userForm.name} onChange={(value) => setUserForm((current) => ({ ...current, name: value }))} required />
                    <AdminInput label="Email" type="email" value={userForm.email} onChange={(value) => setUserForm((current) => ({ ...current, email: value }))} required />
                    <AdminInput
                      label={editingUser ? 'Password (optional)' : 'Password'}
                      type="password"
                      value={userForm.password}
                      onChange={(value) => setUserForm((current) => ({ ...current, password: value }))}
                      required={!editingUser}
                    />
                    <AdminSelect
                      label="Role"
                      value={userForm.role}
                      onChange={(value) => setUserForm((current) => ({ ...current, role: value as 'user' | 'admin' }))}
                      options={[
                        { label: 'User', value: 'user' },
                        { label: 'Admin', value: 'admin' },
                      ]}
                    />

                    <button
                      type="submit"
                      disabled={submittingUser}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {editingUser ? <UserCog className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {submittingUser ? 'Saving...' : editingUser ? 'Update user' : 'Create user'}
                    </button>
                  </form>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                  <SectionToolbar
                    title="Users"
                    search={userSearch}
                    onSearchChange={(value) => {
                      setUserPage(1);
                      setUserSearch(value);
                    }}
                    onRefresh={loadUsers}
                  />

                  <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
                    <div className="hidden grid-cols-12 gap-4 bg-white/8 px-5 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 md:grid items-center">
                      <span className="col-span-3">Name</span>
                      <span className="col-span-4">Email</span>
                      <span className="col-span-2">Role</span>
                      <span className="col-span-3 text-right">Actions</span>
                    </div>

                    {loadingSection.users ? (
                      <EmptyState message="Loading users..." />
                    ) : users.length === 0 ? (
                      <EmptyState message="No users found for the current search." />
                    ) : (
                      users.map((target) => (
                        <div key={target._id} className="border-t border-white/10 bg-slate-950/35 px-5 py-4">
                          <div className="grid gap-4 md:grid-cols-12 md:items-center">
                            <div className="space-y-1 md:col-span-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:hidden">Name</p>
                              <p className="font-medium text-white">{target.name}</p>
                              <p className="text-xs text-slate-400">{formatDate(target.createdAt)}</p>
                            </div>
                            <div className="min-w-0 space-y-1 md:col-span-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:hidden">Email</p>
                              <p className="truncate text-sm text-slate-300">{target.email}</p>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:hidden">Role</p>
                              <span className="inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                                {target.role}
                              </span>
                            </div>
                            <div className="min-w-0 space-y-1 md:col-span-3 md:justify-self-end">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:hidden">Actions</p>
                              <div className="flex flex-wrap gap-2 md:justify-end">
                                <button
                                  type="button"
                                  onClick={() => startUserEdit(target)}
                                  disabled={submittingUser || deletingUserId === target._id}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Pencil className="h-4 w-4" />  
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeUser(target._id)}
                                  disabled={deletingUserId === target._id}
                                  title={deletingUserId === target._id ? 'Deleting...' : 'Delete'}
                                  className={`inline-flex items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 p-2 text-red-100 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-50 ${deletingUserId === target._id ? 'animate-pulse' : ''}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <PaginationControls pagination={userPagination} onChange={setUserPage} />
                </div>
              </div>
            )}

            {section === 'contacts' && (
              <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                <SectionToolbar title="Contacts" onRefresh={loadContacts} />

                <div className="mt-5 space-y-4">
                  {loadingSection.contacts ? (
                    <EmptyState message="Loading contacts..." />
                  ) : contacts.length === 0 ? (
                    <EmptyState message="No contact messages yet." />
                  ) : (
                    contacts.map((contact) => (
                      <div key={contact._id} className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                                  contact.isRead
                                    ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                                    : 'border border-amber-400/20 bg-amber-400/10 text-amber-100'
                                }`}
                              >
                                {contact.isRead ? 'Read' : 'Unread'}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-300">{contact.email}</p>
                            <p className="text-sm text-slate-400">{contact.phone || 'No phone shared'}</p>
                            <p className="mt-4 text-sm leading-6 text-slate-200">{contact.message}</p>
                            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                              Received {formatDate(contact.createdAt)}
                            </p>
                          </div>

                          <div className="flex shrink-0 gap-2">
                            {!contact.isRead && (
                              <button type="button" onClick={() => markContactAsRead(contact._id)} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/20">
                                Mark read
                              </button>
                            )}
                            <button type="button" onClick={() => removeContact(contact._id)} className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-400/20">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <PaginationControls pagination={contactPagination} onChange={setContactPage} />
              </div>
            )}

            {section === 'careers' && (
              <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur-xl">
                <SectionToolbar
                  title="Career Applications"
                  search={careerSearch}
                  onSearchChange={(value) => {
                    setCareerPage(1);
                    setCareerSearch(value);
                  }}
                  onRefresh={loadCareers}
                />

                <div className="mt-5 space-y-4">
                  {loadingSection.careers ? (
                    <EmptyState message="Loading career applications..." />
                  ) : careers.length === 0 ? (
                    <EmptyState message="No career applications found." />
                  ) : (
                    careers.map((application) => (
                      <div key={application._id} className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-violet-300">{application.position}</p>
                            <h3 className="mt-2 text-xl font-semibold text-white">{application.fullName}</h3>
                            <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-300">
                              <span>{application.email}</span>
                              <span>{application.phone}</span>
                              <span>{application.experience}</span>
                            </div>
                            {application.portfolioUrl && (
                              <a
                                href={application.portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-block text-sm font-medium text-cyan-300 hover:text-cyan-200"
                              >
                                Open portfolio
                              </a>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {application.skills.map((skill) => (
                                <span key={skill} className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-100">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                              Resume: {application.resume.fileName} • {formatFileSize(application.resume.size)} •{' '}
                              {formatDate(application.createdAt)}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-wrap gap-2">
                            <button type="button" onClick={() => downloadResume(application._id)} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20">
                              <Download className="h-4 w-4" />
                              Resume
                            </button>
                            <button type="button" onClick={() => removeCareer(application._id)} className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-400/20">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <PaginationControls pagination={careerPagination} onChange={setCareerPage} />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const SectionToolbar: React.FC<{
  title: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  onRefresh: () => void;
}> = ({ title, search, onSearchChange, onRefresh }) => (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <div className="flex flex-col gap-3 sm:flex-row">
      {typeof search === 'string' && onSearchChange && (
        <label className="flex min-w-[260px] items-center gap-3 rounded-full border border-white/10 bg-slate-950/40 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      )}
      <button
        type="button"
        onClick={onRefresh}
        className="rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Refresh
      </button>
    </div>
  </div>
);

const PaginationControls: React.FC<{
  pagination: Pagination;
  onChange: (page: number) => void;
}> = ({ pagination, onChange }) => {
  if (pagination.pages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-400">
        Page {pagination.page} of {pagination.pages} • {pagination.total} total records
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.pages}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/25 px-6 py-12 text-center text-sm text-slate-400">
    {message}
  </div>
);

const fieldBaseClass =
  'mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40';

const AdminInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  required?: boolean;
}> = ({ label, value, onChange, type = 'text', hint, required = false }) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-200">{label}</span>
    {hint && <span className="ml-2 text-xs text-slate-500">{hint}</span>}
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      className={fieldBaseClass}
    />
  </label>
);

const AdminTextarea: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
  required?: boolean;
}> = ({ label, value, onChange, rows = 4, hint, required = false }) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-200">{label}</span>
    {hint && <span className="ml-2 text-xs text-slate-500">{hint}</span>}
    <textarea
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      className={fieldBaseClass}
    />
  </label>
);

const AdminSelect: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}> = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-200">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={fieldBaseClass}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-900">
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const AdminFileInput: React.FC<{
  label: string;
  fileName: string;
  existingValue?: string;
  previewSrc?: string;
  hint?: string;
  onChange: (file: File | null) => void;
  onClear: () => void;
}> = ({ label, fileName, existingValue, previewSrc, hint, onChange, onClear }) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-200">{label}</span>
    {hint && <span className="ml-2 text-xs text-slate-500">{hint}</span>}
    <input
      type="file"
      accept="image/*"
      onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      className={`${fieldBaseClass} file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950`}
    />
    {(fileName || existingValue) && (
      <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {fileName ? 'Selected file' : 'Current image'}
        </p>
        <p className="mt-2 text-sm text-slate-200 break-all">{fileName || existingValue}</p>
        {previewSrc && (
          <img
            loading="lazy"
            decoding="async"
            src={previewSrc}
            alt="Project preview"
            className="mt-4 h-36 w-full rounded-2xl object-cover"
          />
        )}
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
        >
          Clear image
        </button>
      </div>
    )}
  </label>
);

export default AdminPanel;
