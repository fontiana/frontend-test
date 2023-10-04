import { render, screen } from "@testing-library/react";
import Spinner from ".";

describe("<Spinner />", () => {
  const setup = (message?: string) => {
    render(<Spinner page="component" message={message} />);
  };

  it("should render component correctly", () => {
    setup();

    expect(screen.getByTestId("component__spinner")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should render props message", () => {
    const message = "Loading ...";
    setup(message);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
