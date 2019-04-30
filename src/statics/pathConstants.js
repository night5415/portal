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
  country: [
    { text: 'United States', value: 'ffa4e908-d62d-4851-9952-5e4d239aa403' },
    { text: 'Canada', value: '02856de1-73ec-40b2-a3bd-eccc2e7a774c' },
    { text: 'Mexico', value: 'ad0f59ee-f147-4bd9-8290-519e3719f670' }
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
  ],
  state: [
    { text: 'Montana', value: "8fd632b2-24f3-43cd-be16-02321732666e" },
    { text: 'Texas', value: "0487b640-124a-45eb-98cc-05e2d394c995" },
    { text: 'South Carolina', value: "ba9de2e8-9a26-4a0f-8ea4-0b0a526fbecb" },
    { text: 'Utah', value: "e344f35a-c430-434b-87d3-0bb6c494445c" },
    { text: 'Florida', value: "919cc1ac-8cc6-4820-8c9e-104e2c24eff8" },
    { text: 'Washington', value: "fae10c26-b796-494c-ae13-1d45e9a93449" },
    { text: 'Wyoming', value: "1a10db47-8bcc-449d-bd01-25f05774fbe1" },
    { text: 'Marshall Islands', value: "6809be98-a2e2-497d-b11c-2714a616a1c2" },
    { text: 'Palau', value: "f6bf402a-d888-4286-b755-30b76a86aa02" },
    { text: 'Illinois', value: "c25373c5-e7ad-4aba-9ca4-32349bf57d5f" },
    { text: 'Hawaii', value: "34a1db7b-f68c-49d2-9cfa-3cabe0749f07" },
    { text: 'New Mexico', value: "513bef43-4f3a-4ce0-9e4c-3dd61325ee36" },
    { text: 'Arizona', value: "4800c372-f51c-43ff-a47c-446d9d97c945" },
    { text: 'Federated States Of Micronesia', value: "0bf8c14b-930c-4ff8-ba8c-50c77e59f96c" },
    { text: 'Missouri', value: "316d388d-7f76-4492-b64e-50d83643cc6a" },
    { text: 'Indiana', value: "e81af0e5-a5bb-4e01-a830-59901dc84b22" },
    { text: 'Mississippi', value: "0d6d3d3c-74db-4ec0-a559-5a618ec3b458" },
    { text: 'Georgia', value: "dab116f7-e35e-4fb8-bf1c-66560f4fcc3a" },
    { text: 'Idaho', value: "ea97358b-8577-4de9-8ba2-667ba7cda1d5" },
    { text: 'Kentucky', value: "ef511494-8fa4-4eed-8bba-684ff7ac9c91" },
    { text: 'American Samoa', value: "d7f840a1-95eb-4382-8107-6d468a03b97b" },
    { text: 'Iowa', value: "c798f9ed-15f9-4f6e-aed0-72189449ef6c" },
    { text: 'Northern Mariana Islands', value: "671f8f9d-1f07-4ccd-b57d-7af95ab24a4c" },
    { text: 'Guam', value: "9ff9dc37-9c4e-4e0e-a68b-7b725ef09b68" },
    { text: 'Arkansas', value: "093aefee-199a-45f7-94f4-8ae98af29cb4" },
    { text: 'Virgin Islands', value: "18d4bdd5-0f90-4cd2-97e8-8da0e17c6a5f" },
    { text: 'North Carolina', value: "05861733-48f1-400d-aa9b-9aab186a51df" },
    { text: 'Wisconsin', value: "b89bdf80-10e8-472c-8e8c-9c74a148bfe4" },
    { text: 'Alaska', value: "f06672e1-a2f0-4911-8648-9cf451308c88" },
    { text: 'Maryland', value: "a11acbc1-74ab-44ef-8961-9f08871e4b66" },
    { text: 'Oklahoma', value: "2392dbe6-ce54-421d-a9a7-9f09d361cdea" },
    { text: 'South Dakota', value: "c0cc74d3-e09b-4b9b-b5c6-a3d28051a100" },
    { text: 'New Hampshire', value: "fa8d8d7d-81a0-4248-bc13-a63e2b9fcbdc" },
    { text: 'Kansas', value: "6271b7c1-8c72-4107-9389-ad5ea4d399f4" },
    { text: 'New Jersey', value: "7806bc53-a301-46be-ba59-b28ba3ecd6e2" },
    { text: 'Vermont', value: "c132271e-ef56-492a-92cb-b6b76c7c9670" },
    { text: 'Louisiana', value: "ff7b2840-8ed1-4562-9250-bf21c1d30926" },
    { text: 'Ohio', value: "873d4c83-26fd-43ed-9d2c-c4e55bfdbd56" },
    { text: 'Pennsylvania', value: "f5132fc4-1472-4452-ade2-c8ed88ccaf30" },
    { text: 'Puerto Rico', value: "04d7808b-99cd-49b9-af1a-c971635b20e0" },
    { text: 'Nebraska', value: "1551b1f6-0764-48d7-95e9-cdbf67ad0957" },
    { text: 'Connecticut', value: "1f05ca4b-d5d6-4652-ad70-d3e5b91804f3" },
    { text: 'Virginia', value: "84f7af0c-de04-4ec1-a021-d5d7cc8faee0" },
    { text: 'Minnesota', value: "3247906a-473a-4e9a-921a-d6df0f0550d8" },
    { text: 'Alabama', value: "b497473d-f332-441c-a439-dad91d690aa5" },
    { text: 'Nevada', value: "44ec640a-0f5e-4b51-b3a0-db85a832d091" },
    { text: 'Massachusetts', value: "d736c25e-de32-42bf-9380-dbeefa95a4c8" },
    { text: 'Rhode Island', value: "d093a2ae-1ac0-44ce-ad09-dcd478aedb3f" },
    { text: 'West Virginia', value: "ae6de0c1-e7be-419a-acb4-de03a2044dd7" },
    { text: 'Maine', value: "bf8f5218-08c0-40e6-ab67-e49ad31463a6" },
    { text: 'North Dakota', value: "c837ed20-1e2c-4aa9-b373-ebe1fa552372" },
    { text: 'Tennessee', value: "c020c3b2-6e2a-4760-b68c-ec4148511c75" },
    { text: 'Oregon', value: "9de932a2-36f1-44d9-b2a1-ee34e96c5266" },
    { text: 'Delaware', value: "1dc5717b-403f-4d62-a544-efd5b04b83aa" },
    { text: 'District Of Columbia', value: "2683b9a9-ec0f-4934-aff3-effeb591c393" },
    { text: 'New York', value: "55130986-b5c1-4393-85b2-f45db9f74807" },
    { text: 'Colorado', value: "e2f64711-5b38-47a7-bb02-f61914e8157e" },
    { text: 'Michigan', value: "1aa38d9d-5b42-46ad-b89c-fc85a7ceeb35" },
    { text: 'California', value: "aee593db-10de-4f70-ad67-ff716899af88" }
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