// Smart DataTable
export var settings = {
  columns: {
    id: {
      title: 'ID',
      filter: false,
    },
    name: {
      title: 'Full Name',
      filter: false,
    },
    username: {
      title: 'User Name',
      filter: false,
    },
    email: {
      title: 'Email',
      filter: false,
    }
  },
  attr: {
    class: "table table-responsive"
  },
  edit:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  view: {
    confirmSave: true,
    viewButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
  },
};

export var data = [
  {
    id: 1,
    name: 'Leanne Graham',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    notShownField: true,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    prenom: 'Antonette',
    email: 'Shanna@melissa.tv',
    numeroTel: '22 223 333',
    notShownField: true,
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    prenom: 'Samantha',
    email: 'Nathan@yesenia.net',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    prenom: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    prenom: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    prenom: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    prenom: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    numeroTel: '22 333 567',
    notShownField: false,
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    prenom: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    numeroTel: '22 566 778',
    notShownField: true,
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    prenom: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    numeroTel: '22 345 333',
    notShownField: false,
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    prenom: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    numeroTel: '22 665 333',
    notShownField: false,
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
    prenom: 'Nicholas.Stanton',
    email: 'Rey.Padberg@rosamond.biz',
    numeroTel: '22 223 333',
    notShownField: true,
  }
];

export var filtersettings = {
  columns: {
    id: {
      title: 'ID',
    },
    name: {
      title: 'Full Name',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 'Glenna Reichert', title: 'Glenna Reichert' },
            { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
            { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
          ],
        },
      },
    },
    email: {
      title: 'Email',
    },
    passed: {
      title: 'Passed',
      filter: {
        type: 'checkbox',
        config: {
          true: 'Yes',
          false: 'No',
          resetText: 'clear',
        },
      },
    },
  },
  attr: {
    class: "table table-responsive"
  },
  edit:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  view: {
    confirmSave: true,
    editButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
  }
};

export var filerdata = [
  {
    id: 4,
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    passed: 'Yes',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    email: 'Lucio_Hettinger@annie.ca',
    passed: 'No',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    email: 'Karley_Dach@jasper.info',
    passed: 'Yes',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    email: 'Telly.Hoeger@billy.biz',
    passed: 'No',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    email: 'Sherwood@rosamond.me',
    passed: 'Yes',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    email: 'Chaim_McDermott@dana.io',
    passed: 'No',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    email: 'Rey.Padberg@karina.biz',
    passed: 'No',
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
    email: 'Rey.Padberg@rosamond.biz',
    passed: 'Yes',
  },
];

export var alertsettings = {
    
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-1"></i>'
  },
  add: {
    confirmCreate: false,
    addButtonContent: "",
  },
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-1"></i>'
  },
  actions: {
  custom: [
    { name: 'Activate', title: `<i class="ft-toggle-left success font-medium-1 mr-1"></i>` }
  ],

},
  columns: {
    id: {
      title: 'ID',
    },
    nom: {
      title: 'Nom',
    },
    prenom: {
      title: 'Prenom',
    },
    email: {
      title: 'Email',
    },
    numeroTelephone: {
      title: 'Numero du Telephone',
    },
    role: {
      title: 'Role',
      type: 'html',
      editor: {
        type: 'list',
        config: {
          list: [
            {value: 'Administrateur', title: 'Administrateur'},
            {value: 'Gerant', title: 'Gerant'},
            {value: 'Securite', title: 'Securite'},
          ],
        },
      }
    },
  },
  attr: {
    class: "table table-responsive"
  },
};
export var reservationsettings = {
    
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-1"></i>'
  },
  add: {
    confirmCreate: false,
    addButtonContent: "",
  },
  edit:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-1"></i>'
  },
  actions: {
  custom: [
    { name: 'Confirm', title: `<i class="ft-check success font-medium-1 mr-1"></i>` }
  ]
},
  columns: {
    id: {
      title: 'ID',
    },
    name: {
      title: 'Nom',
      editable: false,
    },
    numeroTel: {
      title: 'Numero du Telephone',
      editable: false,
    },
    facebook: {
      title: 'Facebook',
      type: 'html',
      editable: false,
    },
    nombreDepersonnes: {
      title: 'Nombre de Personnes',
      editable: false,
    },
    trancheHoraire: {
      title: 'Tranche Horaire',
    }
  },
  attr: {
    class: "table table-responsive"
  },
};
export var alertdata = [];