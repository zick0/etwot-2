const base = "http://localhost:5000";

export const register_admin = async (obj) => {
  const res = await fetch(`${base}/api/admin/signup`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const login_admin = async (obj) => {
  const res = await fetch(`${base}/api/admin/login`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const auth_admin = async (obj) => {
  const res = await fetch(`${base}/api/admin/auth`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};
export const get_admin_det_by_id = async (obj) => {
  const res = await fetch(`${base}/api/admin/admindets`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};

export const get_forms = async () => {
  const res = await fetch(`${base}/api/admin/forms`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ans = await res.json();
  return ans;
};
