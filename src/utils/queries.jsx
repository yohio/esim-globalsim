export const queries = {
    account: `
        query {
            account {
                nodes {
                    _ID
                    account_balance
                    account_name
                    account_owner
                }
            }
        }
    `,
    
    searchAccount: `
        query SearchAccount($name: String!) {
            account(where: { name: $name }) {
                nodes {
                    _ID
                    account_balance
                    account_name
                    account_owner
                }
            }
        }
    `,

    eSim: `
        query {
            eSim {
                nodes {
                    assigned_account
                    _ID
                    balance
                    iccid
                    msisdn
                    status
                }
            }
        }
    `,

    searchESim: {
        byIccid: `
            query SearchESim($iccid: String!) {
                eSim(where: { iccid: $iccid }) {
                    nodes {
                        assigned_account
                        _ID
                        balance
                        iccid
                        msisdn
                        status
                    }
                }
            }
        `,
        byMsisdn: `
            query SearchESim($msisdn: String!) {
                eSim(where: { msisdn: $msisdn }) {
                    nodes {
                        assigned_account
                        _ID
                        balance
                        iccid
                        msisdn
                        status
                    }
                }
            }
        `,
        byActivation: `
            query SearchESim($activation: String!) {
                eSim(where: { activation_code: $activation }) {
                    nodes {
                        assigned_account
                        _ID
                        balance
                        iccid
                        msisdn
                        status
                    }
                }
            }
        `
    },

    customer: {
        byName: `
            query SearchCustomer($name: String!) {
                customer(where: { name: $name }) {
                    nodes {
                        _ID
                        assigned_esim
                        email
                        first_name
                        last_name
                        phone
                    }
                }
            }
        `,
        byEmail: `
            query SearchCustomer($email: String!) {
                customer(where: { email: $email }) {
                    nodes {
                        _ID
                        assigned_esim
                        email
                        first_name
                        last_name
                        phone
                    }
                }
            }
        `
    }
};