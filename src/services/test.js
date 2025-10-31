import { register, login } from "./cognitoService.ts";

const email = "exmaple@gmail.com";
const password = "Example123!";
const clientid = "7g5gb2ddpe9pase2fl4fdnd3i3"


register(email, password, clientid).then(console.log());
login(email, password, clientid).then(console.log());