export type UserLoginDto = {
    /**
     * @type string
    */
    username: string;
    /**
     * @type string
    */
    password: string;
    /**
     * @type string | undefined
    */
    version?: string;
};