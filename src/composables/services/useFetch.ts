const baseurl = 'https://kart-api-a791f9ba7744.herokuapp.com/';

const useFetch = () => {
  const GET = async <T>(url: string): Promise<T | undefined> => {
    try {
      const response = await fetch(`${baseurl}${url}`);
      return handleResponse<T>(response);
    } catch (error) {
      console.error('Error fetching:', error);
      throw error;
    }
  };

  const POST = async <T, T1 = T>(url: string, body: T): Promise<T1 | undefined> => {
    try {
      const response = await fetch(`${baseurl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return handleResponse<T1 | undefined>(response);
    } catch (error) {
      console.error('Error posting:', error);
      throw error;
    }
  };

  const DELETE = async (url: string): Promise<void> => {
    try {
      const response = await fetch(`${baseurl}${url}`, {
        method: 'DELETE',
      });

      await handleResponse(response);
    } catch (error) {
      console.error('Error deleting:', error);
      throw error;
    }
  };

  const PUT = async <T, T1 = T>(url: string, body: T): Promise<T1 | undefined> => {
    try {
      const response = await fetch(`${baseurl}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return handleResponse<T1>(response);
    } catch (error) {
      console.error('Error putting:', error);
      throw error;
    }
  };

  const PATCH = async <T>(url: string, body: T): Promise<void | undefined> => {
    try {
      const response = await fetch(`${baseurl}${url}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return handleResponse(response);
    } catch (error) {
      console.error('Error patching:', error);
      throw error;
    }
  };

  async function handleResponse<T>(response: Response): Promise<T | undefined> {
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Le serveur est cassé, demande à ton prof de le réparer');
      } else if (response.status === 404) {
        return undefined as T;
      } else if (response.status === 400) {
        throw new Error(
          "Hmmmm, le serveur dit qu'il y a une erreur dans le formulaire.... va voir dans l'onglet network pour plus d'infos"
        );
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    }
    if (response.status === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  }
  return { GET, POST, PATCH, DELETE, PUT };
};
export default useFetch;
