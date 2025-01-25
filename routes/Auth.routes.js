const router = express.Router();
import { crearUsuario } from "../auth/AuthController";

router.post("crearUsuario", crearUsuario);
