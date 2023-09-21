import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchUsers,
    postUsers,
    deleteUsers,
    fetchExternalUsers,
    fetchCompanies
} from '../reducers/user-management/user-management-slice';
import { UserList } from './user-list';
import { Menu, Button, Divider, useDisclosure, Grid, GridItem } from '@chakra-ui/react'
import { UserModal } from './user-modal';

export const MainView = () => {
    const dispatch = useDispatch();
    const { users, companies } = useSelector(state => state.userManagement);
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [modalUser, setModalUser] = useState(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchCompanies());
    }, [dispatch]);

    const loadUsers = async () => {
        dispatch(fetchExternalUsers())
            .then(() => {
                dispatch(fetchUsers());
                dispatch(fetchCompanies());
            });
    };

    const handleUserDelete = async () => {
        dispatch(deleteUsers({ ids: checkedUsers.map(c => c.id) }))
            .then(() => {
                dispatch(fetchUsers());
                setCheckedUsers([]);
            });
     };

    const openUserModal = user => {
        setModalUser(user);
        onOpen();
    };

    const closeUserModal = () => {
        setModalUser({});
        onClose();
    };

    const handleModalSubmit = modalData => {
        dispatch(postUsers([modalData]))
            .then(() => {
                dispatch(fetchUsers());
            });
        closeUserModal();
    };

    const handleCheckboxChange = (checked, id, idx) => {
        setCheckedUsers(
            checked
                ? [...checkedUsers, { id, idx }]
                : checkedUsers.filter(c => c.id !== id)
        );
    };

    return (
        <div className="main-view-container">
            <div className="navbar-container">
                <Menu>
                    <Grid
                        templateColumns="repeat(12, 2fr)"
                        gap={1}
                    >
                        <GridItem colStart={1} colEnd={11}>
                            <Button
                                key="populate"
                                transition='all 0.5s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'blue.400' }}
                                onClick={() => loadUsers()}
                                isDisabled={Boolean(users.length)}
                                colorScheme="messenger"
                            >
                                LoadUsers
                            </Button>
                        </GridItem>
                        <GridItem colSpan={1} display="flex" justifyContent="flex-end" marginRight="-50px">
                            <Button
                                w="100px" 
                                key="add"
                                transition='all 0.5s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'blue.400' }}
                                marginLeft='10px'
                                onClick={() => openUserModal({})}
                            >
                                Add
                            </Button>
                        </GridItem>
                        <GridItem colSpan={1} display="flex" justifyContent="flex-end" marginLeft="45px">
                            <Button
                                w="100px" 
                                key="delete"
                                transition='all 0.5s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'blue.400' }}
                                marginLeft='10px'
                                onClick={() => handleUserDelete()}
                                bg="red"
                            >
                                Delete
                            </Button>
                        </GridItem>
                    </Grid>
                </Menu>
            </div>
            <Divider />
            <div className="user-list-container">
                <UserList
                    users={users}
                    onCheckboxChange={handleCheckboxChange}
                    checkboxStatus={checkedUsers}
                    onRowClick={openUserModal}
                />
            </div>
            <UserModal
                user={modalUser}
                companies={companies}
                isOpen={isOpen}
                onClose={closeUserModal}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
};