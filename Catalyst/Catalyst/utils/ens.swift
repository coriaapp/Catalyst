import Foundation

func getENSName(walletAddress: String, completion: @escaping (Result<String, Error>) -> Void) {
    guard let url = URL(string: "http://localhost:3000/get-ens-name") else {
        completion(.failure(NSError(domain: "", code: 0, userInfo: nil))) // Replace with appropriate error handling
        return
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    let parameters: [String: Any] = ["walletAddress": walletAddress]
    request.httpBody = try? JSONSerialization.data(withJSONObject: parameters)

    let session = URLSession.shared
    let task = session.dataTask(with: request) { (data, response, error) in
        if let error = error {
            completion(.failure(error))
            return
        }

        if let data = data {
            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                   let profile = json["message"] as? String {
                    completion(.success(profile))
                } else {
                    completion(.failure(NSError(domain: "", code: 0, userInfo: nil))) // Replace with appropriate error handling
                }
            } catch {
                completion(.failure(error))
            }
        }
    }

    task.resume()
}
