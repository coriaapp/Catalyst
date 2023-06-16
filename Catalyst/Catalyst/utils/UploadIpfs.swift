import Foundation
import UIKit

func uploadImageToIPFS(_ image: UIImage, completion: @escaping (Result<String, Error>) -> Void) {
    guard let imageData = image.jpegData(compressionQuality: 1) else {
        // Handle error if unable to convert image to data
        completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Failed to convert image to data"])))
        return
    }
    
    // Create a boundary for the multipart form data
    let boundary = "Boundary-\(UUID().uuidString)"
    let lineBreak = "\r\n"
    
    // Construct the multipart form data body
    var requestBody = Data()
    requestBody.append(Data("--\(boundary + lineBreak)".utf8))
    requestBody.append(Data("Content-Disposition: form-data; name=\"file\"; filename=\"image.jpg\"\(lineBreak)".utf8))
    requestBody.append(Data("Content-Type: image/jpeg\(lineBreak + lineBreak)".utf8))
    requestBody.append(imageData)
    requestBody.append(Data("\(lineBreak)--\(boundary)--\(lineBreak)".utf8))
    
    // Create the URL request
    let url = URL(string: "https://ipfs.infura.io:5001/api/v0/add")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
    request.httpBody = requestBody
    
    // Perform the upload task
    let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
        if let error = error {
            // Handle error if the upload task fails
            completion(.failure(error))
            return
        }
        
        guard let data = data,
              let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
              let hash = json["Hash"] as? String else {
            // Handle error if unable to parse the IPFS hash from the response
            completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Failed to retrieve IPFS hash from response"])))
            return
        }
        
        completion(.success(hash))
    }
    task.resume()
}
