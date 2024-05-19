'use client';
import { useEffect, useState } from 'react';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

interface AccountDetailsResponse {
  data: Account[],
  transactions: Transaction[]
}

interface AccountsDetailsResponse {
  data: Account[],
  totalBanks: number,
  totalCurrentBalance: number
}

export const useAccountsDetails = ({ id }: useAccountsDetailsProps) => {
  const [loggedIn, setLoggedIn] = useState<User>();
  const [accounts, setAccounts] = useState<AccountsDetailsResponse>();
  const [account, setAccount] = useState<AccountDetailsResponse>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        setLoggedIn(loggedInUser);

        const accountsResponse = await getAccounts({ userId: loggedInUser.$id });
        if (!accountsResponse) return;

        setAccounts(accountsResponse);

        const currentAppwriteItemId = id || accountsResponse.data[0]?.appwriteItemId;

        const accountResponse = await getAccount({ appwriteItemId: currentAppwriteItemId });
        setAccount(accountResponse);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { loggedIn, accounts, account, loading };
};

