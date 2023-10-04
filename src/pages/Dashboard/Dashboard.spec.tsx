import Dashboard from ".";
import renderer from "react-test-renderer";

describe("Dashboard", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
