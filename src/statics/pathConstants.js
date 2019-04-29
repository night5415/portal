const system = {
  dbName: "PatientPortal",
  dbVersion: 1,
  readwrite: "readwrite"
};

const entity = {
  participant: 'E32955F7-1CE8-46A1-98D3-06A69FA4B29E',
  guardian: ''
}

const route = {
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

const dataStore = {
  login: "login",
  participant: "participant",
  exceptions: "exceptions",
  sessions: "session",
  skills: "skill",
  invoices: "invoice",
  calendar: "calendar"
}

const button = {
  accept: "Accept",
  decline: "Decline"
}

const autoSelect = {
  gender: [
    { text: 'Male', value: 'E3459909-14EA-49CF-B818-8FD786AE3667' },
    { text: 'Female', value: '1BA46E4A-BDA0-4798-8D4F-F8CAAFEAF468' }
  ],
  ethnicity: [
    { text: 'Hispanic/Latino of any race', value: '5374A803-C6FF-4093-AB10-5176D43351E9' },
    { text: 'Non-Hispanic/Latino', value: '2E3C3902-E4F5-446E-8607-6C00B5792426' }
  ],
  race: [
    { text: 'Alaska Native', value: '1BAEA63F-12DB-44AA-941C-06B406B91621' },
    { text: 'Other', value: '30B30793-37A8-452C-A753-0861B01276F2' },
    { text: 'Black or African American', value: '0E83C7B2-7620-494F-A8F4-2BD05BF84EE0' },
    { text: 'Other Pacific Islander', value: '74625379-AD7F-4841-936B-6D97936E7CDD' },
    { text: 'Asian', value: 'C3C9A7A2-ADB6-4BD0-B2DC-7C14800CE14D' },
    { text: 'White', value: 'BED3BB2E-9792-4993-9B06-93A334D81084' },
    { text: 'American Indian', value: 'EFEBE82E-316A-4537-8CF8-989AFFDB05BE' },
    { text: 'Unknown', value: '2EB253F0-0D21-4E0E-96DE-A850D2079A07' },
    { text: 'Hispanic/Latino of any race', value: 'B9A08049-36DF-4AAE-B054-C34A52674AD3' },
    { text: 'Native Hawaiian', value: '0AB1E1BE-EDDE-4D47-8F5A-FFD5C17FD4BB' },
  ],
  language: [
    { text: 'Korean', value: "2783BBE4-B20A-45AF-B5C9-089EC6633ADD" },
    { text: 'Persian', value: "492A3992-76D9-4EA5-9032-09F33A397A93" },
    { text: 'Burmese', value: "1971CDFF-864D-4EEB-953E-1383A3630B62" },
    { text: 'Arabic', value: "B7E67683-779B-4212-BDED-346D332421CA" },
    { text: 'Hmong', value: "4F57C36C-A54D-4418-A24E-3BDBD6DD369B" },
    { text: 'German', value: "7D0881F8-80A9-4BD0-8395-47E4C0240463" },
    { text: 'French', value: "AE826F32-CEA8-409E-B29D-4930F09EEA5B" },
    { text: 'Pennsylvanian Dutch', value: "B81B49CA-5C78-4AC5-A82C-569AF20E9FD5" },
    { text: 'Amharic', value: "5A868D33-01A3-410A-B27F-5A66A9D78557" },
    { text: 'Cushite', value: "493B5DEC-3630-45DA-91D0-5BF0A3820107" },
    { text: 'Vietnamese', value: "F3E51230-B703-48B2-896A-884E88918669" },
    { text: 'Spanish', value: "00A74299-42AC-4EBF-9DA8-8E0446AB3142" },
    { text: 'Serbo-Croatian', value: "8AA277B0-B0B5-4652-BBAB-9B8EA89B846F" },
    { text: 'Laotian', value: "DBEBCFB2-4DB3-4877-9FBB-D31988C75253" },
    { text: 'Tagalog', value: "E5F41E5A-E7FF-47F9-9E9D-DD2D6F01CD9A" },
    { text: 'Russian', value: "AD9C8A57-A33A-43A1-AC70-DE7917EF0D7F" },
    { text: 'English', value: "F03E260F-1FEE-47B8-9C18-E37ECA9F3495" },
    { text: 'Chinese', value: "1D1A0673-A201-492C-AAAF-EA438F931DD0" },
    { text: 'Swahili', value: "AB3D339C-FB0E-419A-A7C9-F32F5ADBF0EF" },
    { text: 'Portuguese', value: "993964F3-8726-438B-BED3-F36D86F3C442" },
    { text: 'Japanese', value: "F94929EE-2AF8-4431-B840-FECB5EC5F15D" }
  ]
}

export {
  system,
  route,
  dataStore,
  button,
  autoSelect,
  entity
};