const USERS_KEY = "usuarios_tienda";
const SESSION_KEY = "sesion_tienda";

export const getStoredUsers = () => {
  const saved = localStorage.getItem(USERS_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getStoredSession = () => {
  const saved = localStorage.getItem(SESSION_KEY);
  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved);
    return parsed && parsed.email ? parsed : null;
  } catch {
    return null;
  }
};

export const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const registerUser = ({ fullName, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  const exists = users.some((user) => user.email === normalizedEmail);
  if (exists) {
    return { ok: false, message: "Ya existe una cuenta con ese correo." };
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveUsers([newUser, ...users]);

  return {
    ok: true,
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  };
};

export const loginUser = ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  const matched = users.find(
    (user) => user.email === normalizedEmail && user.password === password,
  );

  if (!matched) {
    return { ok: false, message: "Correo o contraseña incorrectos." };
  }

  return {
    ok: true,
    user: {
      id: matched.id,
      fullName: matched.fullName,
      email: matched.email,
    },
  };
};
