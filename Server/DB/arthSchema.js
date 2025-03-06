const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// User Schema
const UserSchema = new mongoose.Schema({
    fname: { 
        type: String, 
        required: true 
    },
    lname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    pass: { 
        type: String, 
        required: true 
    },
    repass: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["admin", "subscriber", "artist", "publisher"], 
        default: "subscriber" 
    },
    profilePic: { 
        type: String 
    },
    bio: { 
        type: String 
    },
    friends: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    followers: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    wallet: {
        balance: { 
            type: Number, 
            default: 0 
        },
        cryptoBalance: { 
            type: Number,  // ✅ Corrected "ype" to "type"
            default: 0 
        }
    },    
    subscriptions: [{ 
        plan: { 
            type: String, 
            enum: ["free", "premium"], 
            default: "free" 
        }, 
        expiry: { 
            type: Date
        }
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// hashing password
UserSchema.pre("save", async function () {
    const user = this
  
    if (!user.isModified) {
      return Next()
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(user.pass, saltRound)
      const hashedRepass = await bcrypt.hash(user.repass, saltRound)
      user.pass = hashedPass
      user.repass = hashedRepass
    }
    catch (err) {
      return Next(err)
    }
})

// compare the passwords
UserSchema.methods.comparePassword = async function (pass) {
    return bcrypt.compare(pass, this.pass)
}

// Generate JSON Web Token
UserSchema.methods.generateToken = async function () {
    try {
      // let token = jwt.sign({ _id: this._id, email: this.email }, process.env.SECRET_KEY)
      // this.tokens = this.tokens.concat({ token : token })
      // await this.save()
      // return token
      return jwt.sign(
        {
          _id: this._id.toString(),
          email: this.email,
          fname: this.fname
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        }
      )
    }
    catch (err) {
      console.error("Token Error : ", err)
    }
}

// Export Models
const User = new mongoose.model("USER", UserSchema);
module.exports = User;




































// const Content = mongoose.model("Content", ContentSchema);
// const NFT = mongoose.model("NFT", NFTSchema);
// const Subscription = mongoose.model("Subscription", SubscriptionSchema);
// const Payment = mongoose.model("Payment", PaymentSchema);
// const AdminApproval = mongoose.model("AdminApproval", AdminApprovalSchema);

// module.exports = { User, Content, NFT, Subscription, Payment, AdminApproval };

// Art & Literature Schema
// const ContentSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         required: true 
//     },
//     description: { 
//         type: String 
//     },
//     category: { 
//         type: String, 
//         enum: ["art", "literature"], 
//         required: true 
//     },
//     tags: [String],
//     fileUrl: { 
//         type: String, 
//         required: true 
//     },
//     artist: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User",
//         required: true
//     },
//     likes: { 
//         type: Number, 
//         default: 0 
//     },
//     comments: [{ 
//         user: mongoose.Schema.Types.ObjectId, 
//         ref: "User", 
//         text: String 
//     }],
//     isApproved: { 
//         type: Boolean, 
//         default: false 
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// // NFT Schema
// const NFTSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         required: true 
//     },
//     description: { 
//         type: String 
//     },
//     artist: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User", 
//         required: true 
//     },
//     imageUrl: { 
//         type: String, 
//         required: true 
//     },
//     price: { 
//         type: Number, 
//         required: true 
//     },
//     blockchain: { 
//         type: String, 
//         enum: ["Ethereum", "Polygon"], 
//         required: true 
//     },
//     owner: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User" 
//     },
//     transactionHistory: [{
//         buyer: { 
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: "User" },
//         date: { 
//             type: Date, 
//             default: Date.now 
//         },
//         price: { 
//             type: Number
//         }
//     }],
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// // Subscription Schema
// const SubscriptionSchema = new mongoose.Schema({
//     user: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User", 
//         required: true 

//     },
//     plan: { 
//         type: String, 
//         enum: ["free", "premium"], 
//         required: true 

//     },
//     price: { 
//         type: Number, 
//         required: true 

//     },
//     duration: { 
//         type: String, 
//         enum: ["monthly", "quarterly", "yearly"], 
//         required: true 

//     },
//     paymentStatus: { 
//         type: String, 
//         enum: ["pending", "completed", "failed"], 
//         required: true 

//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 

//     }
// });

// // Payment Schema
// const PaymentSchema = new mongoose.Schema({
//     user: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User", 
//         required: true 
        
//     },
//     amount: { 
//         type: Number, 
//         required: true 
        
//     },
//     currency: { 
//         type: String, 
//         default: "INR" 
        
//     },
//     method: { 
//         type: String, 
//         enum: ["razorpay", "stripe", "crypto"], 
//         required: true 
        
//     },
//     transactionId: { 
//         type: String, 
//         unique: true, 
//         required: true 
        
//     },
//     status: { 
//         type: String, 
//         enum: ["success", "failed", "pending"], 
//         default: "pending" 
        
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
        
//     }
// });

// // Admin Approval Schema
// const AdminApprovalSchema = new mongoose.Schema({
//     content: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "Content", 
//         required: true 
        
//     },
//     admin: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User" 
        
//     },
//     status: { 
//         type: String, 
//         enum: ["approved", "rejected", "pending"], 
//         default: "pending" 
        
//     },
//     remarks: { 
//         type: String 
        
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
        
//     }
// });
