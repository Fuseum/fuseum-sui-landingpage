export const walletFormatAddress = ({
  address,
  maxLength,
}: {
  address: string;
  maxLength: number;
}) => {
  // Check if the address is valid and not empty
  if (!address || typeof address !== "string" || address.length === 0) {
    return "Invalid address";
  }
  // Ensure the address is not too short
  if (address.length <= maxLength) {
    return address;
  }

  // Split the address into parts for formatting
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);

  // Determine the length of the middle part
  const middleLength = maxLength - prefix.length - suffix.length;

  // If there's not enough space for the middle part, return the truncated address
  if (middleLength <= 0) {
    return address.slice(0, maxLength);
  }

  // Generate the middle part with ellipsis
  const middle = "...";

  // Combine the parts and return the formatted address
  return `${prefix}${middle}${suffix}`;
};
