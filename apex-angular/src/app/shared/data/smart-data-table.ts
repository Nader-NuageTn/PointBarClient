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
var isActive =`<i class="ft-toggle-left success font-medium-1 mr-1"></i>`;
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
    { name: 'Activate', title: isActive}
  ],

},
  columns: {
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
      title: 'Telephone',
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
    isConfirmed: {
        title: 'Statut',
        type:'html',
        editable: false,
        valuePrepareFunction: (value) => { 
        console.log(value);
                 if(value == true) {
                     console.log('ouiiiii');
                     return `<span class="badge badge-success">Actif</span>`;
                } else {
                     console.log('nonnnnn');
                     return `<span class="badge badge-danger">D&eacute;sactiv&eacute;</span>`;
             }
           }
    }
  },
  attr: {
    class: "table table-responsive"
  },
};

export var deletedUsersettings = {
    
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ft-toggle-left success font-medium-1 mr-1"></i>'
  },
  add: {
    confirmCreate: false,
    addButtonContent: "",
  },
  edit: {
    confirmSave: false,
    editButtonContent: ''
  },
  columns: {
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
      title: 'Telephone',
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
  edit: {
    confirmSave: false,
    editButtonContent: ''
  },
  actions: {
  custom: [
    { name: 'Confirm', title: `<i class="ft-check success font-medium-1 mr-1"></i>` }
  ]
},
   noDataMessage: 'Pas de R\u00e9servation en Attente',
    pager: {
      display: true,
      perPage: 10,
    },
  columns: {
    id: {
      title: 'ID',
      editable: false,
    },
    fullName: {
      title: 'Client',
      editable: false,
    },
    status: {
      title: 'Statut',
      type: 'html',
      editable: false,
    },
    phone: {
      title: 'Telephone',
      editable: false,
    },
    facebook: {
      title: 'Facebook',
      type: 'html',
      editable: false,
    },
    qtyPersonne: {
      title: 'Client Reserv',
      type: 'html',
      editable: false,
    },
    qtyPersonneArrive: {
      title: 'Client Arriv\u00e9',
      type: 'html',
      editable: false,
    },
    date: {
      title: 'Date',
      editable: false,
    },
    service: {
      title: 'Service',
      editable: false,
   }
  },
  attr: {
    class: "table table-responsive"
  },
};
// Smart DataTable
export var clientsettings = {
    columns: {
        fullName: {
            title: 'Nom Complet',
            filter: true,
        },
        email: {
            title: 'Email',
            filter: true,
        },
        phone: {
            title: 'T\u00e9l\u00e9phone',
            filter: true,
        },
        facebook: {
            title: 'Facebook',
            type: 'html',
            filter: false,
        },
        qtyResrvConfirmed: {
            title: 'Nb Resvr Confirm\u00e9e',
            filter: false,
        },
        qtyResrvCanceled: {
            title: 'Nb Resvr Annul\u00e9e',
            filter: false,
        },
        qtyResrvArrive: {
            title: 'Nb Resvr Arriv\u00e9e',
            filter: false,
        },
        clientReserv: {
            title: 'Client Reserv',
            type: 'html',
            filter: false,
        },
        clientReservArrival: {
            title: 'Client Arriv\u00e9e',
            type: 'html',
            filter: false,
        },
    },
    attr: {
        class: "table table-responsive"
    },
     actions: false,
};

export var clientData = [
  {
  
    name: 'Leanne Graham',
    email: 'Shanna@melissa.tv',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 2,
    reservCanceled: 5,
    reservArrived: 10,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">18F</span> + <span class="badge badge-pill badge-info">12M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">18F</span> + <span class="badge badge-pill badge-info">10M</span></div>'
  },
  {
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 5,
    reservCanceled: 3,
    reservArrived: 14,
    nbPeopleResrv:  '<div><span class="badge badge-pill badge-danger">18F</span> + <span class="badge badge-pill badge-info">17M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">17F</span> + <span class="badge badge-pill badge-info">12M</span></div>'
  },
  {
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 1,
    reservCanceled: 4,
    reservArrived: 2,
    nbPeopleResrv:  '<div><span class="badge badge-pill badge-danger">2F</span> + <span class="badge badge-pill badge-info">6M</span></div>',
    nbPeopleArrived:'<div><span class="badge badge-pill badge-danger">2F</span> + <span class="badge badge-pill badge-info">6M</span></div>'
  },
  {
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 0,
    reservCanceled: 1,
    reservArrived: 10,
    nbPeopleResrv:  '<div><span class="badge badge-pill badge-danger">18F</span> + <span class="badge badge-pill badge-info">4M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">20F</span> + <span class="badge badge-pill badge-info">8M</span></div>'
  },
  {
    name: 'Chelsey Dietrich',
    email: 'Lucio_Hettinger@annie.ca',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 4,
    reservCanceled: 3,
    reservArrived: 7,
    nbPeopleResrv:  '<div><span class="badge badge-pill badge-danger">8F</span> + <span class="badge badge-pill badge-info">12M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">10F</span> + <span class="badge badge-pill badge-info">12M</span></div>'
  },
  {
    name: 'Mrs. Dennis Schulist',
    email: 'Karley_Dach@jasper.info',
    numeroTel: '22 223 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 3,
    reservCanceled: 4,
    reservArrived: 7,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">8F</span> + <span class="badge badge-pill badge-info">10M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">6F</span> + <span class="badge badge-pill badge-info">12M</span></div>'
  },
  {
    name: 'Kurtis Weissnat',
    email: 'Telly.Hoeger@billy.biz',
    numeroTel: '22 333 567',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 3,
    reservCanceled: 2,
    reservArrived: 5,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">5F</span> + <span class="badge badge-pill badge-info">20M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">5F</span> + <span class="badge badge-pill badge-info">15M</span></div>'
  },
  {
    name: 'Nicholas Runolfsdottir V',
    email: 'Sherwood@rosamond.me',
    numeroTel: '22 566 778',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 0,
    reservCanceled: 4,
    reservArrived: 2,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">4F</span> + <span class="badge badge-pill badge-info">8M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">4F</span> + <span class="badge badge-pill badge-info">8M</span></div>'
  },
  {
    name: 'Glenna Reichert',
    email: 'Chaim_McDermott@dana.io',
    numeroTel: '22 345 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 1,
    reservCanceled: 0,
    reservArrived: 3,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">6F</span> + <span class="badge badge-pill badge-info">6M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">6F</span> + <span class="badge badge-pill badge-info">6M</span></div>'
  },
  {
    name: 'Clementina DuBuque',
    email: 'Rey.Padberg@karina.biz',
    numeroTel: '22 665 333',
    facebook:'<a href="http://localhost:4200/users" target="_blank">Page Facebook</a>',
    reservConfirmed: 5,
    reservCanceled: 1,
    reservArrived: 6,
    nbPeopleResrv: '<div><span class="badge badge-pill badge-danger">10F</span> + <span class="badge badge-pill badge-info">20M</span></div>',
    nbPeopleArrived: '<div><span class="badge badge-pill badge-danger">9F</span> + <span class="badge badge-pill badge-info">16M</span></div>'
  }
];
export var alertdata = [];