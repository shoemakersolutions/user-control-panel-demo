import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    InputGroup,
    Input,
    InputLeftAddon,
  } from '@chakra-ui/react'
import { formInputObjectParser } from '../common/form-input-object-parser';
import { userModalFormTemplate } from '../form-templates/user-modal-form-template';

export const UserModal = ({ user, isOpen, onClose, onSubmit }) => {
    const [userObject, setUserObject] = useState({
        id: '',
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      });

    const handleInputChange = event => {
        const valuePath = event.target.name.split('.');
        setUserObject(formInputObjectParser({ ...userObject }, valuePath, valuePath.length - 1, event.target.value));
    };

    useEffect(() => {
        setUserObject(user);
    }, [user]);

    const genericUserFormField = (fieldTemplate) => {
        const { label, field: fieldName, disabled } = fieldTemplate;
        return (
            <InputGroup key={`input_group_${fieldName}`}>
                <InputLeftAddon children={label}/>
                <Input
                    key={`input_${fieldName}`}
                    type="text"
                    value={fieldName.split('.')?.reduce((x, y) => x?.[y], userObject) ?? ''}
                    name={fieldName}
                    onChange={event => handleInputChange(event)}
                    variant='outline'
                    disabled={disabled}
                />
            </InputGroup>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50%">
                <ModalHeader>User info</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <Stack spacing={2}>
                            {userModalFormTemplate.map(fieldTemplate => (
                                genericUserFormField(fieldTemplate)
                            ))}
                        </Stack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={() => onSubmit(userObject)}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
