import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Checkbox
  } from '@chakra-ui/react'

export const UserList = ({ users, onCheckboxChange, onRowClick, checkboxStatus }) => {
    const [listState, setListState] = useState({
        listContent: [],
        sortState: {
            key: 'name',
            order: 'asc',
        },
        checkedIds: []
    });

    const columns = [
        {
            key: 'name',
            label: 'name'
        },
        {
            key: 'username',
            label: 'username',
        },
        {
            key: 'email',
            label: 'email',
        },
        {
            key: 'phone',
            label: 'phone',
        }
    ];

    const getSortedUsers = (key, order) => {
        if (!users) {
            return [];
        }
        if (!key || !order) {
            return users;
        }
        return [...users].sort((a, b) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }

            return 0;
        })
    };

    const sortUsers = key => {
        const order =
            listState.sortState.key === key && listState.sortState.order === 'asc'
                ? 'desc'
                : 'asc';

        setListState({
            listContent: getSortedUsers(key, order),
            sortState: { key, order }
        });
    };

    useEffect(() => {
        setListState({
            ...listState,
            listContent: getSortedUsers(listState.sortState.key, listState.sortState.order),
        });
    }, [users]);

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>User manager demo</TableCaption>
                <Thead>
                    <Tr background={'blackAlpha.600'}>
                        <Th key="checkbox_dummy" />
                        {columns.map(c => (
                            <Th
                                key={c.key}
                                _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                                transition='all 0.5s'
                                onClick={() => sortUsers(c.key)}
                            >
                                {c.label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {listState.listContent?.map((u, idx) => (
                        <React.Fragment key={`frgmt_${idx}`}>
                            <Tr
                                key={`row_${idx}`}
                                transition='all 0.2s'
                                background={idx % 2 ? 'gray.600' : 'gray.700'}
                                _hover={{ bg: 'gray.400' }}
                            >
                                <Td key={`checkbox_cell_${idx}`}>
                                    <Checkbox
                                        key={`checkbox_${idx}}`}
                                        onChange={event => onCheckboxChange(event.target.checked, u.id, idx)}
                                        isChecked={Boolean(checkboxStatus.find(c => c.idx === idx))}
                                    />
                                </Td>
                                {columns.map((c, c_idx) => (
                                    <Td key={`cell_${idx}_${c_idx}`} onClick={() => onRowClick(u)}>{u[c.key]}</Td>
                                ))}
                            </Tr>
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}