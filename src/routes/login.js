export default [
  {
    method: "get",
    url: "/login",
    callback: (req, res, next) => {
      res.status(200).send('login attempt detected');
      next();
      // TODO: add login through google/fb/vk/etc,
      //  this cb should apply correct session redirect uri based on login provider
    },
    guard: () => {
      // TODO: add passport validations based on sepecifed provider
    },
  },
  {
    method: "post",
    url: "/login/clear",
    callback: (req, res) => {
      req.logout();
      res.status(200).send('OK');
    },

  },
  {
    method: "post",
    url: "/login/error",
    callback: (req, res) => {
      res.send({ errors: req.flas('error') });
    },
  },
];
