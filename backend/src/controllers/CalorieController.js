import CalorieEntry from "../models/CalorieEntry";

//GET all the entries
export const getAllCalories = async (requestAnimationFrame,res) => {
    try{
        const entries = await CalorieEntry.find().sort({date: -2});
        res.json(entries)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//POST a new entry
export const createCaliorieEntry = async (req, res) => {
    const {description, calories} = req.body;
    try{
        const newEntry = new CalorieEntry({description, calories});
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch(error) {
            res.status(500).json({message: error.message});
        }
    };
    
    //DELETE an entry
    export const deleteCalorieEntry = async (req, res) => {
        try{
            const entry = await CalorieEntry.findByIdAndDelete(req.params.id);
            if (!entry) {
                return res.status(404).json({ message: "Entry not found"});
            }
            res.json({message: "Entry Deleted"})
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }