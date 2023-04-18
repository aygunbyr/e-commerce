import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDisclosure,
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";

function Basket() {
  const [address, setAddress] = useState("");
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const order = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(order);

    emptyBasket();
    onClose();
  };

  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}

      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="18">
                    {item.title} - {item.price} TL
                  </Text>
                  <Image
                    htmlWidth={200}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>

                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      <Box mt="10">
        <Text fontSize="22">Total: {total}</Text>
      </Box>

      <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
        Order
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Basket;
