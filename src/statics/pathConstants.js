var system = {
  dbName: "PatientPortal",
  dbVersion: 1,
  readwrite: "readwrite"
};

var route = {
  login: {
    name: "login",
    path: "/"
  },
  home: {
    name: "home",
    path: "/home"
  },
  error: {
    name: "error",
    path: "/*"
  },
}

var dataStore = {
  login: "login",
  participant: "participant",
  exceptions: "exceptions",
  sessions: "session",
  skills: "skill",
  invoices: "invoice",
  calendar: "calendar"
}

var button = {
  accept: "Accept",
  decline: "Decline"
}

export {
  system,
  route,
  dataStore,
  button
};