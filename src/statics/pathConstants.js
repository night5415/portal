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
  calendar: "calendar",
  account: "account"
}

const button = {
  accept: "Accept",
  decline: "Decline"
}

const autoSelect = {
  gender: [
    { text: 'Male', value: 'e3459909-14ea-49cf-b818-8fd786ae3667' },
    { text: 'Female', value: '1ba46e4a-bda0-4798-8d4f-f8caafeaf468' }
  ],
  ethnicity: [
    { text: 'Hispanic/Latino of any race', value: '5374a803-c6ff-4093-ab10-5176d43351e9' },
    { text: 'Non-Hispanic/Latino', value: '2e3c3902-e4f5-446e-8607-6c00b5792426' }
  ],
  race: [
    { text: 'Alaska Native', value: '1baea63f-12db-44aa-941c-06b406b91621' },
    { text: 'Other', value: '30b30793-37a8-452c-a753-0861b01276f2' },
    { text: 'Black or African American', value: '0e83c7b2-7620-494f-a8f4-2bd05bf84ee0' },
    { text: 'Other Pacific Islander', value: '74625379-ad7f-4841-936b-6d97936e7cdd' },
    { text: 'Asian', value: 'c3c9a7a2-adb6-4bd0-b2dc-7c14800ce14d' },
    { text: 'White', value: 'bed3bb2e-9792-4993-9b06-93a334d81084' },
    { text: 'American Indian', value: 'efebe82e-316a-4537-8cf8-989affdb05be' },
    { text: 'Unknown', value: '2eb253f0-0d21-4e0e-96de-a850d2079a07' },
    { text: 'Hispanic/Latino of any race', value: 'b9a08049-36df-4aae-b054-c34a52674ad3' },
    { text: 'Native Hawaiian', value: '0ab1e1be-edde-4d47-8f5a-ffd5c17fd4bb' },
  ],
  language: [
    { text: 'Korean', value: "2783bbe4-b20a-45af-b5c9-089ec6633add" },
    { text: 'Persian', value: "492a3992-76d9-4ea5-9032-09f33a397a93" },
    { text: 'Burmese', value: "1971cdff-864d-4eeb-953e-1383a3630b62" },
    { text: 'Arabic', value: "b7e67683-779b-4212-bded-346d332421ca" },
    { text: 'Hmong', value: "4f57c36c-a54d-4418-a24e-3bdbd6dd369b" },
    { text: 'German', value: "7d0881f8-80a9-4bd0-8395-47e4c0240463" },
    { text: 'French', value: "ae826f32-cea8-409e-b29d-4930f09eea5b" },
    { text: 'Pennsylvanian Dutch', value: "b81b49ca-5c78-4ac5-a82c-569af20e9fd5" },
    { text: 'Amharic', value: "5a868d33-01a3-410a-b27f-5a66a9d78557" },
    { text: 'Cushite', value: "493b5dec-3630-45da-91d0-5bf0a3820107" },
    { text: 'Vietnamese', value: "f3e51230-b703-48b2-896a-884e88918669" },
    { text: 'Spanish', value: "00a74299-42ac-4ebf-9da8-8e0446ab3142" },
    { text: 'Serbo-Croatian', value: "8aa277b0-b0b5-4652-bbab-9b8ea89b846f" },
    { text: 'Laotian', value: "dbebcfb2-4db3-4877-9fbb-d31988c75253" },
    { text: 'Tagalog', value: "e5f41e5a-e7ff-47f9-9e9d-dd2d6f01cd9a" },
    { text: 'Russian', value: "ad9c8a57-a33a-43a1-ac70-de7917ef0d7f" },
    { text: 'English', value: "f03e260f-1fee-47b8-9c18-e37eca9f3495" },
    { text: 'Chinese', value: "1d1a0673-a201-492c-aaaf-ea438f931dd0" },
    { text: 'Swahili', value: "ab3d339c-fb0e-419a-a7c9-f32f5adbf0ef" },
    { text: 'Portuguese', value: "993964f3-8726-438b-bed3-f36d86f3c442" },
    { text: 'Japanese', value: "f94929ee-2af8-4431-b840-fecb5ec5f15d" }
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