import client from '.spat/modules/client';

client.showSSR();

firebase.auth().checkAuth().then((user) => {
  client.start();
});
