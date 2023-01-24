
import BasePage from "@/Components/Pages/Base";
import DefaultTemplate from "@/Components/PageTemplates/DefaultTemplate"
import classes from "./classes.module.scss";

export default class Home extends BasePage {
	public override render(): JSX.Element {
		return (
			<DefaultTemplate title={"HomePage"}>
				<div className={classes["root"]}>
				</div>
			</DefaultTemplate>
		);
	}
}
