import { atom } from "recoil";
import { HamsterModel } from "../models/HamsterModel";

//Gallery State
const allHams = atom<HamsterModel[]>({
	key: 'allHams',
	default: []
})



export default allHams
