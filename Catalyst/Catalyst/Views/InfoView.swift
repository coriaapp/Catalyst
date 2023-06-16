//
//  InfoView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 07/06/23.
//

import SwiftUI
import Photos

struct InfoView: View {
    let photo: PHAsset
    
    var body: some View {
        let creationDate = photo.creationDate ?? Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        let formattedDate = dateFormatter.string(from: creationDate)
        dateFormatter.dateFormat = "h:mm a"
        let formattedTime = dateFormatter.string(from: creationDate)
        
        let fileType = photo.mediaType == .image ? "Image" : "Video"
        let resolution = "\(photo.pixelWidth) x \(photo.pixelHeight)"
        
        let location = photo.location

        
        return NavigationView {
            Form {
                Section(header: Text("Photo Info")) {
                    InfoRow(title: "Date", value: formattedDate)
                    InfoRow(title: "Time", value: formattedTime)
                    if let location = location {
                        InfoRow(title: "Latitude", value: "\(location.coordinate.latitude)")
                        InfoRow(title: "Longitude", value: "\(location.coordinate.longitude)")
                    }
                    InfoRow(title: "File Type", value: fileType)
                    InfoRow(title: "Resolution", value: resolution)
                    
                }
            }
            .navigationBarTitle(Text("Metadata"), displayMode: .inline)
        }
    }
}

struct InfoRow: View {
    let title: String
    let value: String
    
    var body: some View {
        HStack {
            Text(title)
                .foregroundColor(.gray)
            Spacer()
            Text(value)
        }
    }
}


struct InfoView_Previews: PreviewProvider {
    static var previews: some View {
        InfoView(photo: PHAsset())
    }
}
