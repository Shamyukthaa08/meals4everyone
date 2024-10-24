const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");
const surprisebag = require('../Models/bag');

const createbag = async(req,res) =>{
    try{
     const {
        name,
        location,
        category,
        possibleItems,
        pickupTimings,
        numberOfBags,
        price,
        ordered} = req.body;

   
   const surpriseBag = new surprisebag({  
    name,
    location,
    category,
    possibleItems,
    pickupTimings,
    numberOfBags,
    price,
    ordered })
    console.log('Saving Surprise Bag: ', surpriseBag);

    await surpriseBag.save();

    console.log('Saved Successfully!');
 
    res.status(201).json({
        message:"Created the bag succesfully",
        success:true
    })
} catch(err){
    res.status(500)
            .json({
                message: "An error occured while creating bag",
                success: false
            });
}
}
const getBags = async(req,res)=>{
    try{
        const bags = await surprisebag.find();
        if(bags.length===0){
            return res.status(404).json({
                message:"No surprise bags found",
                success:false
            });
        }
        res.status(200).json({
            message:"Fetched bags successfully",
            success:true,
            bags
        });
    }
    catch(err){
        res.status(500).json({
            message:"An error occured while fetching bags",
            success:false
        });
    }
}
const getBagsByName = async (req, res) => {
    try {
      const { name } = req.params; 
      
      const bags = await surprisebag.find({ name });
  
      if (bags.length === 0) {
        return res.status(404).json({
          message: "No bags found with the given name",
          success: false,
        });
      }
  
      res.status(200).json({
        message: "Fetched bags successfully",
        success: true,
        bags,
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while fetching bags",
        success: false,
      });
    }
  };
  
const updateBag = async(req,res)=>{
    try{
        const { id } = req.params;
        const {
            name,
            location,
            category,
            possibleItems,
            pickupTimings,
            numberOfBags,
            price,
            ordered
        } = req.body;

        const updatedBag = await surprisebag.findByIdAndUpdate(
            id,
            {
            name,
            location,
            category,
            possibleItems,
            pickupTimings,
            numberOfBags,
            price,
            ordered
            },
            { new:true }
        );
        if(!updateBag){
            return res.status(400).json({
                message:"Bag not found",
                success:false
            });
        }
        res.status(200).json({
            message: "Bag updated successfully",
            success: true,
            bag: updatedBag // Return the updated bag
        });

    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while updating the bag",
            success: false
        });
    }

}

const signup = async (req, res) => {
    try {
        const { name, city, email, password, role } = req.body;  
        const user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, please login', success: false });
        }
        
        
        const userModel = new UserModel({ name, city, email, password, role: role || 'user' });
        
        
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(403)
                .json({ message: 'Auth failed, email or password is wrong', success: false });
        }
        
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: 'Auth failed, email or password is wrong', success: false });
        }
        
       
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },  // Add role to token payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                role: user.role,
                city:user.city

                  
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

module.exports = {
    signup,
    login,
    createbag,
    getBags,
    updateBag,
    getBagsByName
    
};
