const bcrypt = require("bcryptjs")

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db")
    const { username, password, isAdmin } = req.body

    let users = await db.get_user(username)
    let user = users[0]

    if (user) {
      return res.status(409).send(`Username already taken`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let result = await db.register_user(isAdmin, username, hash)
    let existingUser = result[0]

    delete user.password

    req.session.user = existingUser
    res.status(201).send(req.session.user)
  }
}
