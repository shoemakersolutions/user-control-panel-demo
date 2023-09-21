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
    Select,
    Option
  } from '@chakra-ui/react'
import { formInputObjectParser } from '../common/form-input-object-parser';
import { userModalFormTemplate } from '../form-templates/user-modal-form-template';

export const UserModal = ({ user, companies, isOpen, onClose, onSubmit }) => {
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

    const handleCompanyChange = event => {
        setUserObject({
            ...userObject,
            company: !event.target.value ? { id: null } : companies?.find(c => c.id === event.target.value),
        });
    };

    useEffect(() => {
        setUserObject(user);
    }, [user]);

    const genericUserFormField = (fieldTemplate) => {
        const { label, field: fieldName, disabled } = fieldTemplate;
        return (
            <InputGroup key={`input_group_${fieldName}`}>
                <InputLeftAddon key={``} children={label}/>
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

    const companyDropdown = (fieldTemplate) => {
        const { label } = fieldTemplate;
        return (
            <InputGroup>
                <InputLeftAddon key={``} children={label} />
                <Select value={userObject?.company?.id} onChange={event => handleCompanyChange(event)}>
                    <option value={undefined} />
                    {companies.map(c => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </Select>
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
                            {userModalFormTemplate.map(fieldTemplate => {
                                if (fieldTemplate.field === 'company.name') {
                                    return companyDropdown(fieldTemplate);
                                }
                                return genericUserFormField(fieldTemplate)
                            })}
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
