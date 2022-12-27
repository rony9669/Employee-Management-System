import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";

const Form = () => {
  const flag = false;
  return (
    <div className="container mx-auto py-3">
      {flag ? <AddUserForm /> : <UpdateUserForm />}
    </div>
  );
};

export default Form;
