const { response } = require("express");

const employee = require("../models/SignUpModels");

//Showa the list of employees
const index = (req, res, next) => {
  employee
    .find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

const show = (req, res, next) => {
  let employeeid = req.body.employeeid;
  employee
    .findById(employeeid)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

// const store = (req,res)=>{
//     console.log(Object.keys(req),Object.keys(req.body));
//     let Emp = new employee({
//         name:req.body.name,
//         email:req.body.mail,
//         password:req.body.pass
//     })
//     Emp.save()
//     .then(response=>{
//         res.json({
//             message:'Employee added sucessfully',
//             user: Emp
//         })
//     })
//     .catch(response=>{
//         res.json({
//                 message:'An error occured'
//             })
//     })
// }

const login = (req, res) => {
  employee
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          return { user: user };
        }
        return { error: "password mismatch" };
      }
      return { error: "no user found" };
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

const register = (req, res) => {
  employee
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return { error: "user already exists" };
      } else {
        employee
          .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            
          })
          .then((users) => {
            res.json(users);
          })
          .catch((error) => {
            return { error };
          });
      }
    })
    .catch((error) => {
      res.send(error);
    });
};
// const registerUser = (req, res) => {

//     const Emp = {
//       name: req.body.name,
//       email: req.body.mail,
//       password: req.body.pass,
//       repassword:req.body.repass
//     }

//     employee.findOne({
//       email: req.body.mail
//     })
//       .then(user => {
//         if (!user) {
//           bcrypt.hash(req.body.pass, 10, (err, hash) => {
//             Emp.pass = hash
//             employee.create(Emp)
//               .then(user => {
//                 res.json({ status: user.mail + 'Registered!' })
//               })
//               .catch(err => {
//                 res.send('error: ' + err)
//               })
//           })
//         } else {
//           res.json({ error: 'User already exists' })
//         }
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       })
//   }

//   const loginUser = (req, res) => {
//     employee.findOne({
//       email: req.body.mail
//     })
//       .then(user => {
//         if (user) {
//           if (bcrypt.compareSync(req.body.pass, user.pass)) {
//             // Passwords match
//             const payload = {
//                 name: req.body.name,
//                 email: req.body.mail,
//                 password: req.body.pass,
//             }
//             let token = jwt.sign(payload, process.env.SECRET_KEY, {
//               expiresIn: 1440
//             })
//             res.send(token)
//           } else {
//             // Passwords don't match
//             res.json({ error: 'User does not exist' })
//           }
//         } else {
//           res.json({ error: 'User does not exist' })
//         }
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       })
//   }
//update employee
const update = () => {
  let emplyeeid = req.body.employeeid;
  let updateData = {
    name: req.body.name,
    email: req.body.mail,
    password: req.body.pass,
  };
  employee
    .findByIdAndUpdate(emplyeeid, { $set: updateData })
    .then((response) => {
      res.json({
        message: "Employee updated sucessfully",
      });
    })
    .catch((response) => {
      res.json({
        message: "An error occured while updating",
      });
    });
};
//delete data
const destory = () => {
  let email = req.body.employeeid;
  employee
    .findOneAndDelete(email)
    .then((response) => {
      res.json({
        message: "Employee deleted sucessfully",
      });
    })
    .catch((response) => {
      res.json({
        message: "An error occured while deleting",
      });
    });
};

//==========================
// router.delete("/:email/delete", (req, res) => {
//   const email = req.params.email;
//   employee.findOneAndDelete({ email }, (err, user) => {
//     if (err) {
//       res.status(500).json({ msg: "server error", err });
//     } else if (!user) {
//       res.status(400).json({ msg: "user does not exist" });
//     } else {
//       res.status(200).json({ msg: "user deleted", user });
//     }
//   });
// });

//============================

module.exports = {
  index,
  show,
  login,
  register,
  update,
  destory,
};
