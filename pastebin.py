import requests


def get_token(username, password):
    """
    Login to pastes.io and get API token

    Args:
        username (str): Username for the account
        password (str): Password for the account

    Returns:
        dict: Response from the API containing the API token and user information
    """
    url = "https://pastesio.com/api/login"

    headers = {
        'Accept': 'application/json'
    }

    payload = {
        'username': username,
        'password': password
    }

    files = []

    response = requests.post(url, data=payload, files=files, headers=headers)
    data = response.json()
    print(data)
    api_token = None
    if 'success' in data and 'api_token' in data['success']:
        api_token = data['success']['api_token']

    return api_token


def create_paste(token, title, content, status, syntax=None, expire=None, password=None):
    """
    Create a new paste on pastesio.com

    Args:
        token (str): Bearer Token (required)
        title (str): Title of the paste (max 80 chars)
        content (str): Content of the paste (required)
        status (int): Visibility status (required): 0=public, 1=unlisted, 2=private
        syntax (str, optional): Syntax highlighting slug
        expire (str, optional): Expiration time - options: N, 10M, 1H, 1D, 1W, 2W, 1M, 6M, 1Y, SD
        password (str, optional): Password protection (max 50 chars)

    Returns:
        dict: Response from the API
    """
    url = "https://pastesio.com/api/paste/create"

    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    # Prepare payload with required parameters
    payload = {
        'content': content,
        'status': status
    }

    # Add optional parameters if provided
    if syntax:
        payload['syntax'] = syntax
    if expire:
        payload['expire'] = expire
    if title:
        payload['title'] = title
    if password:
        payload['password'] = password

    response = requests.post(url, data=payload, headers=headers)
    return response.json()


def get_paste(token, slug, password=None):
    """
    Get a paste from pastesio.com by its slug

    Args:
        token (str): Bearer Token (required)
        slug (str): The paste's unique identifier
        password (str, optional): Password if the paste is password protected

    Returns:
        dict: Response from the API containing the paste
    """
    url = f"https://pastesio.com/api/pastes/{slug}"

    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    payload = {}
    if password:
        payload['password'] = password

    response = requests.post(url, data=payload, headers=headers)
    return response.json()


def update_paste(token, slug, content, title, status=None, syntax=None, password=None):
    """
    Update an existing paste on pastesio.com

    Args:
        token (str): Bearer Token (required)
        slug (str): The paste's unique identifier (required)
        title (str): Title of the paste (max 80 chars)
        content (str): Updated content of the paste (required)
        status (int, optional): Visibility status: 0=public, 1=unlisted, 2=private
        syntax (str, optional): Syntax highlighting slug
        password (str, optional): Password protection (max 50 chars)

    Returns:
        dict: Response from the API
    """
    url = "https://pastesio.com/api/paste/update"

    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    payload = {
        'slug': slug,
        'content': content
    }

    # Add optional parameters if provided
    if status is not None:
        payload['status'] = status
    if syntax:
        payload['syntax'] = syntax
    if title:
        payload['title'] = title
    if password:
        payload['password'] = password

    response = requests.post(url, data=payload, headers=headers)
    return response.json()


if __name__=="__main__":
    token = get_token(username="graveness638", password="r7I75YzJhbtxd!cnkeKRJ^eC")
    print(token)
    response = create_paste(token=token, content="testiiiing", title="test", status=2)
    print(response)
