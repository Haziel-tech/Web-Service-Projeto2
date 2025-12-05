import React from "react";
import { api } from "../../services/api";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";

interface UserFormProps {
  params: Params;
  navigate: NavigateFunction;
}

interface UserFormState {
  name: string;
  email: string;
  cpf: string;
  password: string;
  loading: boolean;
}

class UserFormClass extends React.Component<UserFormProps, UserFormState> {
  constructor(props: UserFormProps) {
    super(props);

    this.state = {
      name: "",
      email: "",
      cpf: "",
      password: "",
      loading: false,
    };
  }

  async componentDidMount() {
    const id = this.props.params.id;

    if (id) {
      this.setState({ loading: true });

      try {
        const response = await api.get(`/users/${id}`);
        const user = response.data;

        this.setState({
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          password: "",
          loading: false,
        });
            } catch (error) {
              alert("Erro ao carregar usuário!");
              this.setState({ loading: false });
            }
          }
        }
      }
      
      function UserForm() {
        const navigate = useNavigate();
        const params = useParams();
      
        return <UserFormClass params={params} navigate={navigate} />;
      }
      
      export default UserForm;