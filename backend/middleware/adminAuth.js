// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//     try {
//          const token = req.headers.token
//             if(!token) {
//                 return res.json({success: false, message: "Unauthorized access"})
//             }
//             const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
//             if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//                  return res.json({success: false, message: "Unauthorized access"})
//             }
//             next()
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }

// export default adminAuth;
import jwt from "jsonwebtoken";

const adminAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check against env variables
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        email,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
