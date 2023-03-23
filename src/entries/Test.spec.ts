import { describe } from "@jest/globals";
import Tests from "@Tests/index";

(async () => {
	describe("Run all tests", function () {
		Tests.forEach((test: () => void) => {
			test();
		});
	});
})();
