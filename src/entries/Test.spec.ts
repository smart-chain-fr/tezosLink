import "module-alias/register";
import "reflect-metadata";

import { Container } from "typedi";
import TezosLink from "@Common/databases/TezosLink";

import { describe, beforeAll, afterAll } from "@jest/globals";
import Tests from "@Tests/index";

beforeAll(async () => {
	await Container.get(TezosLink).connect();
});

afterAll(async () => {
	await Container.get(TezosLink).disconnect();
});

(async () => {
	describe("Run all tests", function () {
		Tests.forEach((test: () => void) => {
			test();
		});
	});
})();
