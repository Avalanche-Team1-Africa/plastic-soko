import { ethers } from "ethers";
import abi from "./PlasticSokoABI.json";

const CONTRACT_ADDRESS = "0x4D1E468A19613b40699571B803bB45d4D523cc9F";

export function getContract(providerOrSigner) {
  return new ethers.Contract(CONTRACT_ADDRESS, abi, providerOrSigner);
}
