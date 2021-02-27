const sessionInfo= () => {
    const session = JSON.parse(window.sessionStorage.getItem('token'));

    const {name,lastName,token } = session;

    return {name , lastName, token };
}

export default sessionInfo;