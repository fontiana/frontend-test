import { render, fireEvent, screen } from "@testing-library/react";
import ErrorComponent from ".";

describe("<ErrorComponent />", () => {
  const setup = (message: string, onRetry?: () => void) => {
    render(<ErrorComponent message={message} onRetry={onRetry} />);
  };

  it("should render the component correctly", () => {
    const errorMessage = "An error occurred!";

    setup(errorMessage);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByText("Try again")).not.toBeInTheDocument();
  });

  it("should call the onRetry function when the 'Try again' button is clicked", () => {
    const errorMessage = "An error occurred!";
    const onRetryMock = jest.fn();

    setup(errorMessage, onRetryMock);

    const retryButton = screen.getByText("Try again");
    fireEvent.click(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
