const PASTE_TITLE = "ical_sync";
const PASTE_STATUS = 2;
const BASE_URL = "https://pastesio.com";

function proxify(url: string) {
    // return url;
    return `https://api.cors.lol/?url=${url}`;
    // return `https://corsproxy.io/?key=1f8a5538&url=${encodeURIComponent(url)}`;
    // return `https://corsproxy.io/?key=1f8a5538&url=${url}`;
}

async function getToken(username: string, password: string): Promise<string | null> {
    const url = proxify(`${BASE_URL}/api/login`);

    const headers = {
        Accept: "application/json",
    };

    const payload = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        });
        console.log(response);

        const data = await response.json();

        if (data.success && data.success.api_token) {
            return data.success.api_token;
        }

        return null;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}

// async function getPaste(token: string, slug: string, password?: string): Promise<any> {
//     const url = `${BASE_URL}/api/pastes/${slug}`;

//     const headers = {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//     };

//     const payload: Record<string, any> = {};
//     if (password) {
//         payload["password"] = password;
//     }

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: headers,
//             body: Object.keys(payload).length ? JSON.stringify(payload) : undefined,
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching paste:", error);
//         throw error;
//     }
// }

async function createPaste(
    token: string,
    title: string,
    content: string,
    status: number,
    syntax?: string,
    expire?: string,
    password?: string,
): Promise<string | null> {
    const url = `${BASE_URL}/api/paste/create`;

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const payload: Record<string, any> = {
        content: content,
        status: status,
    };

    if (syntax) {
        payload["syntax"] = syntax;
    }
    if (expire) {
        payload["expire"] = expire;
    }
    if (title) {
        payload["title"] = title;
    }
    if (password) {
        payload["password"] = password;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        });
        console.log(response);

        const data = await response.json();

        if (data.success && data.success.slug) {
            return data.success.slug;
        }

        return null;
    } catch (error) {
        console.error("Error creating paste:", error);
        throw error;
    }
}

async function updatePaste(
    token: string,
    slug: string,
    content: string,
    title: string,
    status?: number,
    syntax?: string,
    password?: string,
): Promise<any> {
    const url = `${BASE_URL}/api/paste/update`;

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const payload: Record<string, any> = {
        slug: slug,
        content: content,
    };

    if (status !== undefined) {
        payload["status"] = status;
    }
    if (syntax) {
        payload["syntax"] = syntax;
    }
    if (title) {
        payload["title"] = title;
    }
    if (password) {
        payload["password"] = password;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        });
        console.log(response);

        return await response.json();
    } catch (error) {
        console.error("Error updating paste:", error);
        throw error;
    }
}

export async function storeData(data: string) {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if (!username || !password) {
        throw Error("No username or password provided!");
    }
    let token = await getToken(username, password);
    if (!token) throw Error("Token generation failed.");
    let slug = localStorage.getItem("slug");
    if (!slug) {
        let response = await createPaste(token, PASTE_TITLE, data, PASTE_STATUS);
        if (!response) throw Error("Paste could not be created.");
    } else {
        let response = await updatePaste(token, slug, data, PASTE_TITLE);
        if (!response) throw Error("Paste could not be updated.");
    }
}

export function getPasteUrl(): string | null {
    let slug = localStorage.getItem("slug");
    if (!slug) return null;
    return `https://pastesio.com/raw/${slug}`;
}
