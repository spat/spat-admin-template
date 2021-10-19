var Firerest = require('firerest');

var api = Firerest.create({
  api: 'https://jsonplaceholder.typicode.com',
  cacheKey: '_token',
  tokenKey: 'Token',
  debug: true,
});

// var templates = require('./templates.js');

var admin = {
  menu: [
    {
      label: 'MANAGE',
      items: [
        { label: 'Users', link: '/users' },
      ],
    },
    {
      label: 'Other',
      items: [
        { label: 'Settings', link: '/settings/config' },
      ],
    },
  ],

  schema: {
    users: {
      label: 'ユーザー',
      crud: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      headings: [
        {
          key: 'id',
          label: 'ID',
          type: 'text',
          width: '150px',
        },
        {
          key: 'name',
          label: '名前',
          type: 'text',
          width: '150px',
        },
        {
          key: 'email',
          label: 'メール',
          type: 'text',
          width: '150px',
        },
      ],
      forms: [
        {
          label: '基本',
          class: 'col9',
          fields: [
            {
              key: 'name',
              label: '名前',
              type: 'text',
              width: '150px',    
            },
          ],
        },
        // {
        //   label: 'ラベル',
        //   class: 'col3',
        //   fields: [
        //     templates.fields.user_icon,
        //   ],
        // },
      ],
    },

    'settings/config': {
      label: 'Settings',
      crud: {
        create: false,
        read: true,
        update: true,
        delete: false,
      },
      search: false,
      forms: [
        // {
        //   label: '基本設定',
        //   class: 'col12',
        //   fields: [
        //     templates.fields.name,
        //   ],
        // },
      ],
    },
  },

  crud: {
    async index({path, where, keyword='', opts={}, cursor=null}) {
      var ref = api.child(path);
      var result = await ref.get();

      result.forEach(item => {
        item.path = `${path}/${item.id}`;
      });

      return {
        items: result,
      };
    },
    async get({path, opts}) {
      var ref = api.child(path);
      var result = await ref.get();
      return result;
    },
    async post({path, data}) {
      var now = Date.now();
      var ref = await app.store.collection(path).add({
        created_at: now,
        updated_at: now,
        ...data.data,
      });
      var item = await admin.crud.get({path: ref.path});
      return item;
    },
    async put({path, data}) {
      await app.store.doc(path).update({
        updated_at: Date.now(),
        ...data.data,
      });
      await app.store.doc(path).refresh();
      var item = await admin.crud.get({path});
      return item;
    },
    async del({path}) {
      await app.store.doc(path).delete();
    },
  },

  utils: {
    async uploadFile(file, filename) {
      var ref = firebase.storage().ref();
      var snapshot = await ref.child(firebase.auth().currentUser.uid).child('' + Date.now()).child(filename || file.name).put(file);
      var url = await snapshot.ref.getDownloadURL();
  
      return url;
    },
  },
  
  auth: {

  }
};

export default admin;