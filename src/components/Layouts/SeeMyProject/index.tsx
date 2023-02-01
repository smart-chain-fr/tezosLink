import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate"
import classes from "./classes.module.scss";
import InputField from "../../Elements/InputField"
import { Button } from "@Components/Elements/Button";
import LoginIcon from "@Assets/icons/login.svg"
import { NextRouter, withRouter } from "next/router";

interface IProps {}
type IState = {
    projectUuid: string;
    errorMsg: string;
    inputStatus: 'error' | 'success' | 'neutral';
}

interface WithRouterProps {
    router: NextRouter
}

interface IProps extends WithRouterProps {}

class SignInProject extends BasePage<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.state = {
            projectUuid: "",
            errorMsg: "",
            inputStatus: 'neutral'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    public override render(): JSX.Element {
        return (
            <DefaultTemplate title={"See My Project"}>
                <div className={classes["root"]}>
                    <h1>See my project</h1>
                    <div>
                        <InputField
                            errorMsg={this.state.errorMsg}
                            inputStatus={this.state.inputStatus}
                            onChange={this.handleChangeInput}
                            type="text"
                            icon={LoginIcon}
                            name="uuid"
                            placeholder="e4efba4d-47e6-42a5-905e-589d3f673853"/>
                        <Button text="Access to my project" icon={LoginIcon} onClick={this.handleSubmit} />
                    </div>
                </div>
            </DefaultTemplate>
        );
    }
    
    private handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({projectUuid: event.target.value})
        if (this.state.inputStatus !== 'neutral') {
            if (event.target.value === "") {
                this.setState({errorMsg: "Project ID is required", inputStatus: 'error'});
            } else if (event.target.value.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
                this.setState({errorMsg: "", inputStatus: 'success'});
            } else {
                this.setState({errorMsg: "Must be a valid UUID", inputStatus: 'error'});
            }
        }
    }

    private handleSubmit() {
        if (this.state.projectUuid === "") {
            this.setState({errorMsg: "Project ID is required", inputStatus: 'error'});
        } else if (!this.state.projectUuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
                this.setState({errorMsg: "Must be a valid UUID", inputStatus: 'error'});
        } else {
            this.props.router.push('/dashboard/' + this.state.projectUuid + "?ft=false");
        }
    }
}

export default withRouter(SignInProject);
