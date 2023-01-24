
import HomeBuilt from "@/Components/Elements/HomeBuilt";
import HomeGetStarted from "@/Components/Elements/HomeGetStarted";
import HomeHead from "@/Components/Elements/HomeHead";
import HomeMetrics from "@/Components/Elements/HomeMetrics";
import HomePanels from "@/Components/Elements/HomePanels";
import HomeTrusted from "@/Components/Elements/HomeTrusted";
import BasePage from "@/Components/Pages/Base";
import DefaultTemplate from "@/Components/PageTemplates/DefaultTemplate"
import classes from "./classes.module.scss";

export default class Home extends BasePage {
	public override render(): JSX.Element {
		return (
			<DefaultTemplate title={"HomePage"}>
				<div className={classes["root"]}>
                    <HomeHead/>
                    <HomeBuilt/>
                    <HomeTrusted/>
                    <HomeMetrics/>
                    <HomePanels/>
                    <HomeGetStarted/>
				</div>
			</DefaultTemplate>
		);
	}
}
