//
//  ContentView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 05/06/23.
//

import SwiftUI
import PhotosUI

struct ContentView: View {
    let readWriteStatus = PHPhotoLibrary.authorizationStatus(for: .readWrite)
    
    @State var photosAuth = false
    var body: some View {
        if (readWriteStatus != .authorized) {
            GiveFullAccessView()
                .onAppear {
                    PHPhotoLibrary.requestAuthorization(for: .readWrite) { status in
                        print(status.rawValue)
                        print(readWriteStatus)
                    }
                }
        } else {
            TabView {
                PhotosView()
                    .tabItem {
                        Label("Home", systemImage: "photo.fill")
                    }
                
                SettingsView()
                    .tabItem {
                        Label("Settings", systemImage: "gearshape.fill")
                    }
            }
        }
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
