//
//  PhotosView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 05/06/23.
//

import SwiftUI
import Photos

struct PhotosView: View {
    @State private var photos: [PHAsset] = []
    
    var body: some View {
        NavigationView {
            GeometryReader { geo in
                ScrollView {
                        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 4) {
                            ForEach(photos, id: \.self) { photo in
                                NavigationLink(destination: PhotoDetailView(photo: photo)) {
                                    Image(uiImage: loadImage(from: photo))
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(width: geo.size.width * 0.33, height: geo.size.width * 0.33)
                                        .cornerRadius(2)
                                }
                            }
                        }
                    }
                    .navigationTitle("Library")
                    .onAppear {
                        fetchPhotos()
                    }
            }
        }
    }
    
    private func fetchPhotos() {
        PHPhotoLibrary.requestAuthorization { status in
            if status == .authorized {
                let fetchOptions = PHFetchOptions()
                let result = PHAsset.fetchAssets(with: fetchOptions)
                DispatchQueue.main.async {
                    self.photos = result.objects(at: IndexSet(0..<result.count))
                }
            }
        }
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


struct PhotosView_Previews: PreviewProvider {
    static var previews: some View {
        PhotosView()
    }
}
