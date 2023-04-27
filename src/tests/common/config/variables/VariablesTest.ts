import "module-alias/register";
import "reflect-metadata";

import { Container } from "typedi";
import { describe, it } from "@jest/globals";

import { BackendVariables } from "@Common/config/variables/Variables";

export default () => {
	describe("BackendVariables", () => {
		it("is valid", async () => {
			await Container.get(BackendVariables).validate();
		});
	});
};
