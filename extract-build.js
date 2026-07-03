import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { createExtractorFromData } from "node-unrar-js";
import { execSync } from "child_process";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const APPS_DIR = path.join(PUBLIC_DIR, "apps");

// --- MOCK CONTENT STRINGS ---

const MOCK_FIREBASE_TS = `// mock-firebase.ts
// Universal offline-first mock for Firebase (Auth and Firestore)

export class Timestamp {
  seconds: number;
  nanoseconds: number;
  constructor(seconds: number, nanoseconds: number) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }
  static now() {
    return new Timestamp(Math.floor(Date.now() / 1000), 0);
  }
  static fromDate(date: Date) {
    return new Timestamp(Math.floor(date.getTime() / 1000), 0);
  }
  static fromMillis(milliseconds: number) {
    return new Timestamp(Math.floor(milliseconds / 1000), 0);
  }
  toDate() {
    return new Date(this.seconds * 1000);
  }
  toMillis() {
    return this.seconds * 1000;
  }
}

const listeners = new Set<() => void>();
const notify = () => {
  listeners.forEach(cb => {
    try { cb(); } catch(e) { console.error(e); }
  });
};

const seedData = {
  // esplanadaviva
  "users/mock-uid-123": {
    id: "mock-uid-123",
    name: "João Silva",
    email: "joao@example.com",
    role: "admin",
    points: 150,
    streak: 5,
    lessonsCompleted: 12,
    chaptersRead: 25,
    medalsCount: 3
  },
  "users/mock-user-456": {
    id: "mock-user-456",
    name: "Maria Santos",
    email: "maria@example.com",
    role: "user",
    points: 80,
    streak: 2,
    lessonsCompleted: 4,
    chaptersRead: 8,
    medalsCount: 1
  },
  "challenges/c1": {
    id: "c1",
    title: "Leitura diária",
    description: "Leia o capítulo do dia na Bíblia",
    points: 10,
    active: true
  },
  "challenges/c2": {
    id: "c2",
    title: "Estudo da lição",
    description: "Complete a lição da Escola Sabatina",
    points: 15,
    active: true
  },
  "prayers/p1": {
    id: "p1",
    title: "Oração pela família",
    description: "Saúde e união de todos",
    category: "Família",
    ativo: true,
    userEmail: "joao@example.com",
    created: new Date().toISOString()
  },

  // cabeca-do-joao
  "agenda/item1": {
    id: "item1",
    titulo: "Almoço com a família",
    data: new Date().toISOString().split('T')[0],
    concluido: false,
    descricao: "Almoço especial de domingo na casa da vovó."
  },
  "recados/item2": {
    id: "item2",
    texto: "Lembre-se de tomar água e descansar um pouco hoje!",
    autor: "Amor",
    data: new Date().toISOString()
  },
  "status_joao/current": {
    id: "current",
    status: "Estudando Teologia 📖",
    atualizadoEm: new Date().toISOString()
  },

  // confirma-main
  "users/mock-uid-123/isPaid": {
    id: "mock-uid-123",
    email: "joao@example.com",
    name: "João Silva",
    isPaid: true
  },

  // estudobiblicosrestinga
  "series/s1": {
    id: "s1",
    nome: "O Evangelho de João",
    ativo: true
  },
  "locais/l1": {
    id: "l1",
    nome: "Restinga Central",
    ativo: true
  },
  "usuarios/user1": {
    id: "user1",
    nome: "Pastor André",
    email: "andre@example.com",
    cargo: "Pastor",
    igrejaId: "l1",
    ativo: true
  },

  // turmaxi
  "anuncios/a1": {
    id: "a1",
    titulo: "Próximo Retiro Acadêmico",
    conteudo: "Nosso próximo retiro será no mês de Outubro. Preparem-se!",
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  "disciplinas/d1": {
    id: "d1",
    nome: "Soteriologia I",
    ativo: true
  },
  "meditacoes/m1": {
    id: "m1",
    nome: "Meditação Diária: O Poder da Oração Eficaz",
    data: new Date().toISOString().split('T')[0],
    criadoEm: new Date().toISOString()
  }
};

try {
  const isInitialized = localStorage.getItem("mock_firebase_db_initialized");
  if (!isInitialized) {
    Object.entries(seedData).forEach(([path, data]) => {
      localStorage.setItem(\`mock_firebase_db:\${path}\`, JSON.stringify(data));
    });
    localStorage.setItem("mock_firebase_db_initialized", "true");
  }
} catch (e) {
  console.warn("localStorage not available", e);
}

export const initializeApp = () => ({});

class MockAuth {
  currentUser: any = null;
  private authListeners = new Set<(user: any) => void>();

  constructor() {
    try {
      const saved = localStorage.getItem("mock_firebase_auth_user");
      if (saved) {
        this.currentUser = JSON.parse(saved);
      } else {
        this.currentUser = {
          uid: "mock-uid-123",
          email: "joao@example.com",
          emailVerified: true,
          isAnonymous: false,
          displayName: "João Silva",
          providerData: []
        };
        localStorage.setItem("mock_firebase_auth_user", JSON.stringify(this.currentUser));
      }
    } catch (e) {
      this.currentUser = {
        uid: "mock-uid-123",
        email: "joao@example.com",
        emailVerified: true,
        isAnonymous: false,
        displayName: "João Silva",
        providerData: []
      };
    }
  }

  onAuthStateChanged(callback: (user: any) => void) {
    callback(this.currentUser);
    this.authListeners.add(callback);
    return () => {
      this.authListeners.delete(callback);
    };
  }

  private triggerAuthChange() {
    try {
      if (this.currentUser) {
        localStorage.setItem("mock_firebase_auth_user", JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem("mock_firebase_auth_user");
      }
    } catch (e) {}
    this.authListeners.forEach(cb => cb(this.currentUser));
  }

  async signInAnonymously() {
    this.currentUser = {
      uid: "anon-" + Math.random().toString(36).substring(2, 10),
      isAnonymous: true,
      email: null,
      emailVerified: false,
      displayName: "Convidado Anônimo",
      providerData: []
    };
    this.triggerAuthChange();
    return { user: this.currentUser };
  }

  async signInWithEmailAndPassword(email: string) {
    this.currentUser = {
      uid: "user-" + email.replace(/[^a-zA-Z0-9]/g, ""),
      email,
      emailVerified: true,
      isAnonymous: false,
      displayName: email.split('@')[0],
      providerData: []
    };
    this.triggerAuthChange();
    return { user: this.currentUser };
  }

  async createUserWithEmailAndPassword(email: string) {
    this.currentUser = {
      uid: "user-" + email.replace(/[^a-zA-Z0-9]/g, ""),
      email,
      emailVerified: true,
      isAnonymous: false,
      displayName: email.split('@')[0],
      providerData: []
    };
    this.triggerAuthChange();
    return { user: this.currentUser };
  }

  async signOut() {
    this.currentUser = null;
    this.triggerAuthChange();
  }

  async sendPasswordResetEmail() {}
  async verifyPasswordResetCode() { return "joao@example.com"; }
  async confirmPasswordReset() {}
}

const globalAuth = new MockAuth();
export const getAuth = () => globalAuth;
export const signInAnonymously = (auth: any) => auth.signInAnonymously();
export const signInWithEmailAndPassword = (auth: any, email: string) => auth.signInWithEmailAndPassword(email);
export const createUserWithEmailAndPassword = (auth: any, email: string) => auth.createUserWithEmailAndPassword(email);
export const signOut = (auth: any) => auth.signOut();
export const sendPasswordResetEmail = (auth: any) => auth.sendPasswordResetEmail();
export const verifyPasswordResetCode = (auth: any) => auth.verifyPasswordResetCode();
export const confirmPasswordReset = (auth: any) => auth.confirmPasswordReset();
export const onAuthStateChanged = (auth: any, cb: any) => auth.onAuthStateChanged(cb);

export const getFirestore = () => ({});

export const collection = (db: any, path: string, ...segments: string[]) => {
  const fullPath = [path, ...segments].filter(Boolean).join('/');
  return { type: 'collection', path: fullPath };
};

export const doc = (dbOrCol: any, pathOrId?: string, ...segments: string[]) => {
  if (dbOrCol && dbOrCol.type === 'collection') {
    const fullPath = \`\${dbOrCol.path}/\${pathOrId}\`;
    return { type: 'document', path: fullPath, id: pathOrId };
  }
  const fullPath = [pathOrId, ...segments].filter(Boolean).join('/');
  const id = fullPath.substring(fullPath.lastIndexOf('/') + 1);
  return { type: 'document', path: fullPath, id };
};

export const getDoc = async (docRef: any) => {
  try {
    const key = \`mock_firebase_db:\${docRef.path}\`;
    const saved = localStorage.getItem(key);
    const exists = saved !== null;
    return {
      id: docRef.id,
      exists: () => exists,
      data: () => exists ? JSON.parse(saved || '{}') : undefined
    };
  } catch (e) {
    return { id: docRef.id, exists: () => false, data: () => undefined };
  }
};

export const getDocFromServer = getDoc;

const getCollectionDocs = (collectionPath: string) => {
  const prefix = \`mock_firebase_db:\${collectionPath}/\`;
  const docs = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const docPath = key.substring(\`mock_firebase_db:\`.length);
        const rest = docPath.substring(collectionPath.length + 1);
        if (!rest.includes('/')) {
          const val = JSON.parse(localStorage.getItem(key) || 'null');
          if (val) {
            docs.push({ id: rest, data: val });
          }
        }
      }
    }
  } catch (e) {
    console.error("Error reading collection docs", e);
  }
  return docs;
};

export const getDocs = async (colRef: any) => {
  const docs = getCollectionDocs(colRef.path);
  return {
    docs: docs.map(d => ({
      id: d.id,
      data: () => d.data,
      exists: () => true
    })),
    forEach: (cb: any) => {
      docs.forEach(d => {
        cb({
          id: d.id,
          data: () => d.data,
          exists: () => true
        });
      });
    },
    empty: docs.length === 0,
    size: docs.length
  };
};

export const setDoc = async (docRef: any, data: any, options?: any) => {
  try {
    const key = \`mock_firebase_db:\${docRef.path}\`;
    let finalData = { ...data };
    if (options && options.merge) {
      const existing = localStorage.getItem(key);
      if (existing) {
        finalData = { ...JSON.parse(existing), ...data };
      }
    }
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
};

export const updateDoc = async (docRef: any, data: any) => {
  try {
    const key = \`mock_firebase_db:\${docRef.path}\`;
    const existing = localStorage.getItem(key);
    const finalData = existing ? { ...JSON.parse(existing), ...data } : { ...data };
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
};

export const addDoc = async (colRef: any, data: any) => {
  const id = Math.random().toString(36).substring(2, 12);
  const docPath = \`\${colRef.path}/\${id}\`;
  try {
    const key = \`mock_firebase_db:\${docPath}\`;
    localStorage.setItem(key, JSON.stringify({ ...data, id }));
    notify();
  } catch (e) {}
  return { id, path: docPath };
};

export const deleteDoc = async (docRef: any) => {
  try {
    const key = \`mock_firebase_db:\${docRef.path}\`;
    localStorage.removeItem(key);
    notify();
  } catch (e) {}
};

export const onSnapshot = (queryOrDoc: any, next: any) => {
  const trigger = () => {
    if (queryOrDoc.type === 'collection') {
      const docs = getCollectionDocs(queryOrDoc.path);
      next({
        docs: docs.map(d => ({
          id: d.id,
          data: () => d.data,
          exists: () => true
        })),
        forEach: (cb: any) => {
          docs.forEach(d => {
            cb({
              id: d.id,
              data: () => d.data,
              exists: () => true
            });
          });
        },
        empty: docs.length === 0,
        size: docs.length
      });
    } else {
      const key = \`mock_firebase_db:\${queryOrDoc.path}\`;
      let saved = null;
      try {
        saved = localStorage.getItem(key);
      } catch (e) {}
      const exists = saved !== null;
      next({
        id: queryOrDoc.id,
        exists: () => exists,
        data: () => exists ? JSON.parse(saved || '{}') : undefined
      });
    }
  };
  trigger();
  listeners.add(trigger);
  return () => {
    listeners.delete(trigger);
  };
};

export const query = (colRef: any, ...args: any[]) => colRef;
export const orderBy = () => ({});
export const where = () => ({});
export const limit = () => ({});

export const serverTimestamp = () => new Date().toISOString();

export const writeBatch = () => {
  const operations: (() => void)[] = [];
  return {
    set: (docRef: any, data: any, options?: any) => {
      operations.push(() => setDoc(docRef, data, options));
    },
    update: (docRef: any, data: any) => {
      operations.push(() => updateDoc(docRef, data));
    },
    delete: (docRef: any) => {
      operations.push(() => deleteDoc(docRef));
    },
    commit: async () => {
      operations.forEach(op => op());
      notify();
    }
  };
};
`;

const MOCK_TURMAXI_JS = `// firebase.js
// Mock offline-first Firebase for Turma XI

const listeners = new Set();
const notify = () => {
  listeners.forEach(cb => {
    try { cb(); } catch(e) { console.error(e); }
  });
};

export const db = {};
export const storage = {};

const getCollectionDocs = (collectionPath) => {
  const prefix = "mock_firebase_db:" + collectionPath + "/";
  const docs = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const docPath = key.substring("mock_firebase_db:".length);
        const rest = docPath.substring(collectionPath.length + 1);
        if (!rest.includes('/')) {
          const val = JSON.parse(localStorage.getItem(key) || 'null');
          if (val) {
            docs.push({ id: rest, data: val });
          }
        }
      }
    }
  } catch (e) {
    console.error("Error reading collection docs", e);
  }
  return docs;
};

export function collection(db, path) {
  return { type: 'collection', path };
}

export function doc(db, colOrPath, ...segments) {
  if (db && db.type === 'collection') {
    const fullPath = db.path + "/" + colOrPath;
    return { type: 'document', path: fullPath, id: colOrPath };
  }
  const fullPath = [colOrPath, ...segments].filter(Boolean).join('/');
  const id = fullPath.substring(fullPath.lastIndexOf('/') + 1);
  return { type: 'document', path: fullPath, id };
}

export async function getDoc(docRef) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    const saved = localStorage.getItem(key);
    const exists = saved !== null;
    return {
      id: docRef.id,
      exists: () => exists,
      data: () => exists ? JSON.parse(saved || '{}') : undefined
    };
  } catch (e) {
    return { id: docRef.id, exists: () => false, data: () => undefined };
  }
}

export const getDocFromServer = getDoc;

export async function getDocs(queryRef) {
  const path = queryRef.path || (queryRef.col && queryRef.col.path);
  const docs = getCollectionDocs(path);
  return {
    docs: docs.map(d => ({
      id: d.id,
      data: () => d.data,
      exists: () => true
    })),
    forEach: (cb) => {
      docs.forEach(d => {
        cb({
          id: d.id,
          data: () => d.data,
          exists: () => true
        });
      });
    },
    empty: docs.length === 0,
    size: docs.length
  };
}

export async function setDoc(docRef, data, options) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    let finalData = { ...data };
    if (options && options.merge) {
      const existing = localStorage.getItem(key);
      if (existing) {
        finalData = { ...JSON.parse(existing), ...data };
      }
    }
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
}

export async function updateDoc(docRef, data) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    const existing = localStorage.getItem(key);
    const finalData = existing ? { ...JSON.parse(existing), ...data } : { ...data };
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
}

export async function addDoc(colRef, data) {
  const id = Math.random().toString(36).substring(2, 12);
  const docPath = colRef.path + "/" + id;
  try {
    const key = "mock_firebase_db:" + docPath;
    localStorage.setItem(key, JSON.stringify({ ...data, id }));
    notify();
  } catch (e) {}
  return { id, path: docPath };
}

export async function deleteDoc(docRef) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    localStorage.removeItem(key);
    notify();
  } catch (e) {}
}

export function query(colRef, ...args) { return colRef; }
export function orderBy() { return {}; }
export function where() { return {}; }
export function limit() { return {}; }
export function serverTimestamp() { return new Date().toISOString(); }

export function ref(storage, path) {
  return { type: 'storage', path };
}

export async function uploadBytes(storageRef, file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        localStorage.setItem("mock_storage:" + storageRef.path, reader.result);
      } catch (e) {
        console.warn("Could not save to mock storage", e);
      }
      resolve();
    };
    reader.readAsDataURL(file);
  });
}

export async function getDownloadURL(storageRef) {
  const saved = localStorage.getItem("mock_storage:" + storageRef.path);
  if (saved) return saved;
  return "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=300&auto=format&fit=crop";
}
`;

const MOCK_ESTUDOBIBLICOS_JS = `// firebase-config.js
// Mock offline-first Firebase for Estudo Biblicos

const listeners = new Set();
const notify = () => {
  listeners.forEach(cb => {
    try { cb(); } catch(e) { console.error(e); }
  });
};

export const app = {};
export const db = {};

class MockAuth {
  currentUser = null;
  privateListeners = new Set();

  constructor() {
    try {
      const saved = localStorage.getItem("mock_firebase_auth_user");
      if (saved) {
        this.currentUser = JSON.parse(saved);
      } else {
        this.currentUser = {
          uid: "user-admin",
          email: "admin@example.com",
          emailVerified: true,
          displayName: "Administrador",
          role: "admin"
        };
        localStorage.setItem("mock_firebase_auth_user", JSON.stringify(this.currentUser));
      }
    } catch (e) {
      this.currentUser = { uid: "user-admin", email: "admin@example.com" };
    }
  }

  onAuthStateChanged(callback) {
    callback(this.currentUser);
    this.privateListeners.add(callback);
    return () => {
      this.privateListeners.delete(callback);
    };
  }

  triggerChange() {
    try {
      if (this.currentUser) {
        localStorage.setItem("mock_firebase_auth_user", JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem("mock_firebase_auth_user");
      }
    } catch (e) {}
    this.privateListeners.forEach(cb => cb(this.currentUser));
  }

  async signInWithEmailAndPassword(email, password) {
    this.currentUser = {
      uid: "user-" + email.replace(/[^a-zA-Z0-9]/g, ""),
      email,
      displayName: email.split('@')[0]
    };
    this.triggerChange();
    return { user: this.currentUser };
  }

  async createUserWithEmailAndPassword(email, password) {
    this.currentUser = {
      uid: "user-" + email.replace(/[^a-zA-Z0-9]/g, ""),
      email,
      displayName: email.split('@')[0]
    };
    this.triggerChange();
    return { user: this.currentUser };
  }

  async signOut() {
    this.currentUser = null;
    this.triggerChange();
  }
}

export const auth = new MockAuth();

export function getAuth() { return auth; }
export function signInWithEmailAndPassword(a, email, password) { return auth.signInWithEmailAndPassword(email, password); }
export function createUserWithEmailAndPassword(a, email, password) { return auth.createUserWithEmailAndPassword(email, password); }
export function signOut(a) { return auth.signOut(); }
export function onAuthStateChanged(a, cb) { return auth.onAuthStateChanged(cb); }
export function setPersistence() { return Promise.resolve(); }
export const browserLocalPersistence = {};

export function initializeApp() { return app; }
export function deleteApp() { return Promise.resolve(); }

const getCollectionDocs = (collectionPath) => {
  const prefix = "mock_firebase_db:" + collectionPath + "/";
  const docs = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const docPath = key.substring("mock_firebase_db:".length);
        const rest = docPath.substring(collectionPath.length + 1);
        if (!rest.includes('/')) {
          const val = JSON.parse(localStorage.getItem(key) || 'null');
          if (val) {
            docs.push({ id: rest, data: val });
          }
        }
      }
    }
  } catch (e) {
    console.error("Error reading collection docs", e);
  }
  return docs;
};

export function collection(db, path) {
  return { type: 'collection', path };
}

export function doc(db, colOrPath, ...segments) {
  if (db && db.type === 'collection') {
    const fullPath = db.path + "/" + colOrPath;
    return { type: 'document', path: fullPath, id: colOrPath };
  }
  const fullPath = [colOrPath, ...segments].filter(Boolean).join('/');
  const id = fullPath.substring(fullPath.lastIndexOf('/') + 1);
  return { type: 'document', path: fullPath, id };
}

export async function getDoc(docRef) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    const saved = localStorage.getItem(key);
    const exists = saved !== null;
    return {
      id: docRef.id,
      exists: () => exists,
      data: () => exists ? JSON.parse(saved || '{}') : undefined
    };
  } catch (e) {
    return { id: docRef.id, exists: () => false, data: () => undefined };
  }
}

export async function getDocs(queryRef) {
  const path = queryRef.path || (queryRef.col && queryRef.col.path);
  const docs = getCollectionDocs(path);
  return {
    docs: docs.map(d => ({
      id: d.id,
      data: () => d.data,
      exists: () => true
    })),
    forEach: (cb) => {
      docs.forEach(d => {
        cb({
          id: d.id,
          data: () => d.data,
          exists: () => true
        });
      });
    },
    empty: docs.length === 0,
    size: docs.length
  };
}

export async function setDoc(docRef, data, options) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    let finalData = { ...data };
    if (options && options.merge) {
      const existing = localStorage.getItem(key);
      if (existing) {
        finalData = { ...JSON.parse(existing), ...data };
      }
    }
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
}

export async function updateDoc(docRef, data) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    const existing = localStorage.getItem(key);
    const finalData = existing ? { ...JSON.parse(existing), ...data } : { ...data };
    localStorage.setItem(key, JSON.stringify(finalData));
    notify();
  } catch (e) {}
}

export async function addDoc(colRef, data) {
  const id = Math.random().toString(36).substring(2, 12);
  const docPath = colRef.path + "/" + id;
  try {
    const key = "mock_firebase_db:" + docPath;
    localStorage.setItem(key, JSON.stringify({ ...data, id }));
    notify();
  } catch (e) {}
  return { id, path: docPath };
}

export async function deleteDoc(docRef) {
  try {
    const key = "mock_firebase_db:" + docRef.path;
    localStorage.removeItem(key);
    notify();
  } catch (e) {}
}

export function query(colRef, ...args) { return colRef; }
export function where() { return {}; }
export function limit() { return {}; }
export function serverTimestamp() { return new Date().toISOString(); }
`;

// Helper to slugify filenames
function getSlug(filename) {
  return filename
    .replace(/\.(zip|rar)$/i, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Prettify slug or filename for user display
function prettifyName(filename) {
  const base = filename.replace(/\.(zip|rar)$/i, "");
  return base
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Recursively find index.html
function findIndexHtml(dir) {
  try {
    const files = fs.readdirSync(dir);
    if (files.includes("index.html")) {
      return "index.html";
    }
    for (const file of files) {
      if (file === "node_modules" || file === "dist") continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const found = findIndexHtml(fullPath);
        if (found) {
          return path.join(file, found);
        }
      }
    }
  } catch (err) {
    console.error(`Error searching index.html in ${dir}:`, err);
  }
  return null;
}

// Recursively find package.json directories
function findPackageJsonDirs(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findPackageJsonDirs(fullPath));
      } else if (entry.name === "package.json") {
        results.push(dir);
      }
    }
  } catch (e) {
    console.error(`Error finding package.json in ${dir}:`, e);
  }
  return results;
}

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to remove directory recursively
function removeDirRecursive(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

async function extractRarArchive(archivePath, destDir) {
  const buf = fs.readFileSync(archivePath);
  const extractor = await createExtractorFromData({ data: buf });
  const list = extractor.getFileList();
  const fileHeaders = [...list.fileHeaders];
  
  const extracted = extractor.extract({ files: fileHeaders.map(h => h.name) });
  for (const file of extracted.files) {
    if (file.fileHeader.flags.directory) {
      fs.mkdirSync(path.join(destDir, file.fileHeader.name), { recursive: true });
    } else {
      const filePath = path.join(destDir, file.fileHeader.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      if (file.extraction) {
        fs.writeFileSync(filePath, file.extraction);
      }
    }
  }
}

// Apply patches to static and React sub-projects
function applyPatches(destDir) {
  console.log(`Applying offline Firebase patches in ${destDir}...`);

  // 1. Static App: Turma XI
  const firestorePath = path.join(destDir, "turmaxi-main/scripts/services/firestore.js");
  const storagePath = path.join(destDir, "turmaxi-main/scripts/services/storage.js");
  const firebasePath = path.join(destDir, "turmaxi-main/scripts/services/firebase.js");

  if (fs.existsSync(firestorePath)) {
    const serviceDir = path.dirname(firestorePath);
    fs.writeFileSync(path.join(serviceDir, "firebase.js"), MOCK_TURMAXI_JS);
    console.log("  [TurmaXI] Injected firebase.js mock");

    let content = fs.readFileSync(firestorePath, "utf8");
    if (content.includes("https://www.gstatic.com/firebasejs")) {
      content = content.replace(
        /import\s*\{\s*collection,\s*getDocs,\s*query,\s*where,\s*orderBy,\s*addDoc,\s*updateDoc,\s*deleteDoc,\s*doc,\s*serverTimestamp\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-firestore\.js['"];\s*import\s*\{\s*db\s*\}\s*from\s*['"]\.\/firebase\.js['"];/s,
        `import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  db
} from "./firebase.js";`
      );
      fs.writeFileSync(firestorePath, content);
      console.log("  [TurmaXI] Patched firestore.js imports");
    }

    if (fs.existsSync(storagePath)) {
      let sContent = fs.readFileSync(storagePath, "utf8");
      if (sContent.includes("https://www.gstatic.com/firebasejs")) {
        sContent = sContent.replace(
          /import\s*\{\s*ref,\s*uploadBytes,\s*getDownloadURL\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-storage\.js['"];\s*import\s*\{\s*storage\s*\}\s*from\s*['"]\.\/firebase\.js['"];/s,
          `import {
  ref,
  uploadBytes,
  getDownloadURL,
  storage
} from "./firebase.js";`
        );
        fs.writeFileSync(storagePath, sContent);
        console.log("  [TurmaXI] Patched storage.js imports");
      }
    }
  }

  // 2. Static App: Estudo Biblicos
  const restingaFirebasePath = path.join(destDir, "estudobiblicosrestinga-main/firebase-config.js");
  const restingaAuthPath = path.join(destDir, "estudobiblicosrestinga-main/auth.js");
  const restingaAppPath = path.join(destDir, "estudobiblicosrestinga-main/app.js");

  if (fs.existsSync(restingaFirebasePath)) {
    fs.writeFileSync(restingaFirebasePath, MOCK_ESTUDOBIBLICOS_JS);
    console.log("  [EstudoBiblicos] Injected firebase-config.js mock");

    if (fs.existsSync(restingaAuthPath)) {
      let content = fs.readFileSync(restingaAuthPath, "utf8");
      if (content.includes("https://www.gstatic.com/firebasejs")) {
        content = content.replace(
          /import\s*\{\s*signInWithEmailAndPassword,\s*onAuthStateChanged,\s*signOut,\s*setPersistence,\s*browserLocalPersistence\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-auth\.js['"];\s*import\s*\{\s*doc,\s*getDoc,\s*getDocs,\s*collection,\s*query,\s*where,\s*limit\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-firestore\.js['"];\s*import\s*\{\s*auth,\s*db\s*\}\s*from\s*['"]\.\/firebase-config\.js['"];/s,
          `import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  auth,
  db
} from "./firebase-config.js";`
        );
        fs.writeFileSync(restingaAuthPath, content);
        console.log("  [EstudoBiblicos] Patched auth.js imports");
      }
    }

    if (fs.existsSync(restingaAppPath)) {
      let content = fs.readFileSync(restingaAppPath, "utf8");
      if (content.includes("https://www.gstatic.com/firebasejs")) {
        content = content.replace(
          /import\s*\{\s*collection,\s*addDoc,\s*getDocs,\s*updateDoc,\s*deleteDoc,\s*doc,\s*setDoc,\s*getDoc,\s*query,\s*where,\s*limit,\s*serverTimestamp\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-firestore\.js['"];\s*import\s*\{\s*getAuth,\s*createUserWithEmailAndPassword,\s*signOut\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-auth\.js['"];\s*import\s*\{\s*initializeApp,\s*deleteApp\s*\}\s*from\s*['"]https:\/\/www\.gstatic\.com\/firebasejs\/.*firebase-app\.js['"];\s*import\s*\{\s*app,\s*db\s*\}\s*from\s*['"]\.\/firebase-config\.js['"];/s,
          `import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  limit,
  serverTimestamp,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  initializeApp,
  deleteApp,
  app,
  db
} from "./firebase-config.js";`
        );
        fs.writeFileSync(restingaAppPath, content);
        console.log("  [EstudoBiblicos] Patched app.js imports");
      }
    }
  }

  // 3. React/TypeScript Apps (Inject mock-firebase.ts and patch aliases in vite.config.ts)
  const pkgDirs = findPackageJsonDirs(destDir);
  for (const pkgDir of pkgDirs) {
    const srcDir = path.join(pkgDir, "src");
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }
    fs.writeFileSync(path.join(srcDir, "mock-firebase.ts"), MOCK_FIREBASE_TS);
    console.log(`  [React-Mock] Injected mock-firebase.ts to ${srcDir}`);

    const viteConfigPath = path.join(pkgDir, "vite.config.ts");
    if (fs.existsSync(viteConfigPath)) {
      let content = fs.readFileSync(viteConfigPath, "utf8");
      if (!content.includes("firebase/app")) {
        content = content.replace(
          /alias:\s*\{\s*['"]@['"]:\s*path\.resolve\(__dirname,\s*['"]\.['"]\),?\s*\}/g,
          `alias: {
        '@': path.resolve(__dirname, '.'),
        'firebase/app': path.resolve(__dirname, 'src/mock-firebase.ts'),
        'firebase/auth': path.resolve(__dirname, 'src/mock-firebase.ts'),
        'firebase/firestore': path.resolve(__dirname, 'src/mock-firebase.ts'),
      }`
        );
        // Fallback for single quote matching without trailing comma
        content = content.replace(
          "alias: {\n        '@': path.resolve(__dirname, '.'),\n      }",
          `alias: {
        '@': path.resolve(__dirname, '.'),
        'firebase/app': path.resolve(__dirname, 'src/mock-firebase.ts'),
        'firebase/auth': path.resolve(__dirname, 'src/mock-firebase.ts'),
        'firebase/firestore': path.resolve(__dirname, 'src/mock-firebase.ts'),
      }`
        );
        fs.writeFileSync(viteConfigPath, content);
        console.log(`  [React-Mock] Patched vite.config.ts in ${pkgDir}`);
      }
    }
  }
}

// Helper to copy directory recursively ignoring node_modules, dist and .git
function copyDirRecursiveIgnoringNodeModulesAndDist(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursiveIgnoringNodeModulesAndDist(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  console.log("Preparing public directories...");
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  
  // Clear existing apps to force a fresh, clean extraction, patching, and compilation
  console.log("Clearing existing apps directory...");
  removeDirRecursive(APPS_DIR);
  fs.mkdirSync(APPS_DIR, { recursive: true });

  const rootFiles = fs.readdirSync(process.cwd());
  const archives = rootFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return (ext === ".zip" || ext === ".rar") && file !== "portfólio-interativo.zip";
  });

  const discoveredApps = [];

  // 1. Process standard zip/rar archives
  for (const archive of archives) {
    const archivePath = path.join(process.cwd(), archive);
    const stats = fs.statSync(archivePath);
    if (stats.isDirectory() || stats.size < 100) {
      continue;
    }

    const slug = getSlug(archive);
    const destDir = path.join(APPS_DIR, slug);
    const isZip = path.extname(archive).toLowerCase() === ".zip";

    console.log(`\n========================================`);
    console.log(`Processing archive: ${archive} -> slug: ${slug}`);
    console.log(`========================================`);
    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        if (isZip) {
          const zip = new AdmZip(archivePath);
          zip.extractAllTo(destDir, true);
        } else {
          await extractRarArchive(archivePath, destDir);
        }
        console.log(`Successfully extracted ${archive}`);
      }

      // --- APPLY PAT CHES BEFORE COMPILING ---
      applyPatches(destDir);

      // --- COMPILE AND CLEAN REACT/VITE APPLICATIONS ---
      const pkgDirs = findPackageJsonDirs(destDir);
      for (const pkgDir of pkgDirs) {
        console.log(`\n--- Compiling sub-application in: ${pkgDir} ---`);
        try {
          console.log("Running npm install...");
          execSync("npm install", { cwd: pkgDir, stdio: "inherit" });

          console.log("Running npm run build...");
          execSync("npm run build", { cwd: pkgDir, stdio: "inherit" });

          const distPath = path.join(pkgDir, "dist");
          if (fs.existsSync(distPath)) {
            console.log("Build succeeded. Relocating built static assets...");
            const tempDist = path.join(APPS_DIR, "temp-build");
            removeDirRecursive(tempDist);
            
            // Copy dist to temp
            copyDirRecursive(distPath, tempDist);
            
            // Clear entire source directory
            removeDirRecursive(pkgDir);
            
            // Restore clean subdirectory with compiled assets
            fs.mkdirSync(pkgDir, { recursive: true });
            copyDirRecursive(tempDist, pkgDir);
            
            // Cleanup temp folder
            removeDirRecursive(tempDist);
            console.log(`Sub-application ${slug} compiled and cleaned successfully!`);
          } else {
            console.error(`Error: Build directory 'dist' was not found in ${pkgDir}`);
          }
        } catch (buildErr) {
          console.error(`Failed to compile sub-application in ${pkgDir}:`, buildErr);
        }
      }

      const relativeIndexPath = findIndexHtml(destDir);
      if (relativeIndexPath) {
        discoveredApps.push({
          id: slug,
          name: prettifyName(archive),
          archiveName: archive,
          entryPath: `apps/${slug}/${relativeIndexPath.replace(/\\/g, "/")}`,
          type: isZip ? "zip" : "rar",
          size: stats.size
        });
        console.log(`Found entry: /apps/${slug}/${relativeIndexPath}`);
      } else {
        console.warn(`Could not find index.html in ${slug}`);
      }
    } catch (err) {
      console.error(`Failed to process ${archive}:`, err);
    }
  }

  // 2. Process directory-based apps (like 8ª-convenção-de-quartetos)
  const excludedDirs = ["public", "src", "node_modules", ".git", ".github", "dist", "assets"];
  const subDirs = rootFiles.filter(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.statSync(fullPath).isDirectory()) return false;
    if (excludedDirs.includes(file)) return false;
    return fs.existsSync(path.join(fullPath, "package.json")) || fs.existsSync(path.join(fullPath, "index.html"));
  });

  for (const subDir of subDirs) {
    const subDirPath = path.join(process.cwd(), subDir);
    const slug = getSlug(subDir);
    const destDir = path.join(APPS_DIR, slug);

    console.log(`\n========================================`);
    console.log(`Processing directory app: ${subDir} -> slug: ${slug}`);
    console.log(`========================================`);

    try {
      removeDirRecursive(destDir);
      fs.mkdirSync(destDir, { recursive: true });
      copyDirRecursiveIgnoringNodeModulesAndDist(subDirPath, destDir);

      // --- COMPILE AND CLEAN REACT/VITE APPLICATIONS ---
      const pkgDirs = findPackageJsonDirs(destDir);
      for (const pkgDir of pkgDirs) {
        console.log(`\n--- Compiling sub-application in: ${pkgDir} ---`);
        try {
          console.log("Running npm install...");
          execSync("npm install", { cwd: pkgDir, stdio: "inherit" });

          console.log("Running npm run build...");
          execSync("npm run build", { cwd: pkgDir, stdio: "inherit" });

          const distPath = path.join(pkgDir, "dist");
          if (fs.existsSync(distPath)) {
            console.log("Build succeeded. Relocating built static assets...");
            const tempDist = path.join(APPS_DIR, "temp-build");
            removeDirRecursive(tempDist);
            
            // Copy dist to temp
            copyDirRecursive(distPath, tempDist);
            
            // Clear entire source directory
            removeDirRecursive(pkgDir);
            
            // Restore clean subdirectory with compiled assets
            fs.mkdirSync(pkgDir, { recursive: true });
            copyDirRecursive(tempDist, pkgDir);
            
            // Cleanup temp folder
            removeDirRecursive(tempDist);
            console.log(`Sub-application ${slug} compiled and cleaned successfully!`);
          } else {
            console.error(`Error: Build directory 'dist' was not found in ${pkgDir}`);
          }
        } catch (buildErr) {
          console.error(`Failed to compile sub-application in ${pkgDir}:`, buildErr);
        }
      }

      const relativeIndexPath = findIndexHtml(destDir);
      if (relativeIndexPath) {
        discoveredApps.push({
          id: slug,
          name: prettifyName(subDir),
          archiveName: subDir,
          entryPath: `apps/${slug}/${relativeIndexPath.replace(/\\/g, "/")}`,
          type: "zip",
          size: 0
        });
        console.log(`Found entry: /apps/${slug}/${relativeIndexPath}`);
      } else {
        console.warn(`Could not find index.html in ${slug}`);
      }
    } catch (err) {
      console.error(`Failed to process directory app ${subDir}:`, err);
    }
  }

  // Always inject the custom "Meu Casamento" app pointing to /indexcasamento.html
  discoveredApps.push({
    id: "meu-casamento",
    name: "Meu Casamento",
    archiveName: "indexcasamento.html",
    entryPath: "indexcasamento.html",
    type: "zip",
    size: 0
  });

  fs.writeFileSync(path.join(PUBLIC_DIR, "apps.json"), JSON.stringify(discoveredApps, null, 2));
  console.log(`\nSuccessfully generated public/apps.json with ${discoveredApps.length} apps!`);
}

build().catch(console.error);
