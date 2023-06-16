//
//  PhotoDetailView.swift
//  Catalyst
//
//  Created by Shreyas Papinwar on 07/06/23.
//

import SwiftUI
import Photos

struct PhotoDetailView: View {
    let photo: PHAsset
    
    @State private var isSharingSheetPresented = false
    @State private var isInfoSheetPresented = false

    var body: some View {
        Image(uiImage: loadImage(from: photo))
            .resizable()
            .aspectRatio(contentMode: .fit)
            .navigationBarTitle(Text(getDate(photo: photo)), displayMode: .inline)
            .navigationBarItems(
                        trailing:
                            HStack {
                                Button(action: {
                                    isInfoSheetPresented = true
                                }) {
                                    Image(systemName: "info.circle")
                                }
                                .sheet(isPresented: $isInfoSheetPresented) {
                                    InfoView(photo: photo)
                                }
                                
                                Button(action: {
                                    isSharingSheetPresented = true
                                }) {
                                    Image(systemName: "square.and.arrow.up")
                                }
                                .sheet(isPresented: $isSharingSheetPresented) {
                                    ActivityView(activityItems: [loadImage(from: photo)])
                                }
                            }
                    )
    }
    
    private func getDate(photo: PHAsset) -> String {
        let creationDate = photo.creationDate ?? Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        let formattedDate = dateFormatter.string(from: creationDate)
        
        return formattedDate
    }
    
    private func loadImage(from asset: PHAsset) -> UIImage {
        let manager = PHImageManager.default()
        let options = PHImageRequestOptions()
        options.isSynchronous = true
        var image = UIImage()
        manager.requestImage(for: asset, targetSize: CGSize(width: 1080, height: 1080), contentMode: .aspectFill, options: options) { result, _ in
            if let result = result {
                image = result
            }
        }
        return image
    }
}

struct ActivityView: UIViewControllerRepresentable {
    let activityItems: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        let activityViewController = UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
        return activityViewController
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {
        // No update needed
    }
}

struct PhotoDetailView_Previews: PreviewProvider {
    static var previews: some View {
        PhotoDetailView(photo: PHAsset())
    }
}
